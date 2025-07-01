// utils/tripsStorage.ts
export interface StoredTrip {
  id: string;
  destination: string;
  date: string;
  participants: number;
  price: string;
  duration: string;
  transactionHash: string;
  bookingDate: string;
  image: string;
  userAddress: string;
  productId: number;
}

export const tripsStorage = {
  // Save new trip
  save: (trip: Omit<StoredTrip, "id" | "bookingDate">): StoredTrip => {
    const newTrip: StoredTrip = {
      ...trip,
      id: Date.now().toString(),
      bookingDate: new Date().toISOString().split("T")[0] || "",
    };

    const existing = tripsStorage.getAll();
    const updated = [...existing, newTrip];
    localStorage.setItem("userTrips", JSON.stringify(updated));

    console.log("Viaggio salvato:", newTrip);
    return newTrip;
  },

  // Get every booking
  getAll: (): StoredTrip[] => {
    try {
      const stored = localStorage.getItem("userTrips");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Errore nel leggere i viaggi:", error);
      return [];
    }
  },

  // Get orders for a certain address
  getByUser: (address: string): StoredTrip[] => {
    return tripsStorage
      .getAll()
      .filter(
        (trip) => trip.userAddress.toLowerCase() === address.toLowerCase()
      );
  },

  // Delete every booking (debug function)
  clear: (): void => {
    localStorage.removeItem("userTrips");
    console.log("Tutti i viaggi cancellati");
  },

  // Delete everything for an address
  clearByUser: (address: string): void => {
    const allTrips = tripsStorage.getAll();
    const filtered = allTrips.filter(
      (trip) => trip.userAddress.toLowerCase() !== address.toLowerCase()
    );
    localStorage.setItem("userTrips", JSON.stringify(filtered));
    console.log(`Viaggi cancellati per ${address}`);
  },

  // Debug: show every booking
  debug: (): void => {
    console.log("Tutti i viaggi salvati:", tripsStorage.getAll());
  },
};

export const dateHelper = {
  // Convert formats
  parseProductDate: (productDate: string): string => {
    try {
      console.log("Parsing date:", productDate); // Debug

      let day: string, month: string;

      if (productDate.includes("-")) {
        // Format "01.10-14.10" o "01/10-14/10"
        const parts = productDate.split("-");
        if (parts.length === 0) throw new Error("Invalid date format");

        const startDate = parts[0];
        if (!startDate) throw new Error("No start date found");

        if (startDate.includes(".")) {
          // Format "01.10"
          const dateParts = startDate.split(".");
          if (dateParts.length < 2) throw new Error("Invalid date parts");
          day = dateParts[0] || "";
          month = dateParts[1] || "";
        } else if (startDate.includes("/")) {
          // Format "01/10"
          const dateParts = startDate.split("/");
          if (dateParts.length < 2) throw new Error("Invalid date parts");
          day = dateParts[0] || "";
          month = dateParts[1] || "";
        } else {
          throw new Error("Unrecognized date separator");
        }
      } else if (productDate.includes(".")) {
        // Format "01.10"
        const dateParts = productDate.split(".");
        if (dateParts.length < 2) throw new Error("Invalid date parts");
        day = dateParts[0] || "";
        month = dateParts[1] || "";
      } else {
        throw new Error("No recognized date format");
      }

      if (!day || !month) throw new Error("Missing day or month");

      const dayNum = parseInt(day, 10);
      const monthNum = parseInt(month, 10);

      if (isNaN(dayNum) || isNaN(monthNum)) {
        throw new Error("Invalid day or month numbers");
      }

      // Validation range
      if (dayNum < 1 || dayNum > 31) throw new Error("Day out of range");
      if (monthNum < 1 || monthNum > 12) throw new Error("Month out of range");

      const year = new Date().getFullYear() + 1; // Next year

      // Debug detailed
      console.log("Creating date with:", {
        year,
        month: monthNum,
        day: dayNum,
      });

      const date = new Date(year, monthNum - 1, dayNum);

      console.log("Date created:", date.toDateString());
      console.log(
        "Year check:",
        date.getFullYear(),
        "=",
        year,
        "?",
        date.getFullYear() === year
      );
      console.log(
        "Month check:",
        date.getMonth() + 1,
        "=",
        monthNum,
        "?",
        date.getMonth() + 1 === monthNum
      );
      console.log(
        "Day check:",
        date.getDate(),
        "=",
        dayNum,
        "?",
        date.getDate() === dayNum
      );

      // Verify data
      if (
        date.getFullYear() !== year ||
        date.getMonth() + 1 !== monthNum ||
        date.getDate() !== dayNum
      ) {
        throw new Error(
          `Invalid date created: expected ${dayNum}/${monthNum}/${year}, got ${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`
        );
      }

      const isoString = date.toISOString();
      const datePart = isoString.split("T")[0];

      if (!datePart) throw new Error("Failed to extract date part");

      console.log("Parsed successfully:", datePart); // Debug
      return datePart;
    } catch (error) {
      console.warn("Error parsing date:", productDate, error);
      // Fallback: in 30 days
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);

      const fallbackIsoString = futureDate.toISOString();
      const fallbackDatePart = fallbackIsoString.split("T")[0];

      console.log("Using fallback date:", fallbackDatePart); // Debug
      return (
        fallbackDatePart ||
        new Date().toISOString().split("T")[0] ||
        "2025-12-31"
      );
    }
  },
};
