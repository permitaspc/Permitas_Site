"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface BookingWidgetProps {
  bookingUrl: string; // e.g., "dinesh/30min"
}

export default function BookingWidget({ bookingUrl }: BookingWidgetProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="w-full h-full min-h-[600px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <Cal
        calLink={bookingUrl
          .replace("https://cal.com/", "")
          .replace("cal.com/", "")}
        style={{ width: "100%", height: "100%", minHeight: "600px" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
