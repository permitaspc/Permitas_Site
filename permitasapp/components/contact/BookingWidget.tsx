"use client";

import Cal from "@calcom/embed-react";

interface BookingWidgetProps {
  bookingUrl: string; // e.g., "cal.eu/dinesh831" or "dinesh/30min"
}

export default function BookingWidget({ bookingUrl }: BookingWidgetProps) {
  // Determine if it's a cal.eu link
  const isEu = bookingUrl.includes("cal.eu");

  // Extract the path (username/event)
  // distinct cleaning for robustness
  const calLink = bookingUrl
    .replace(/^https?:\/\//, "") // Remove protocol
    .replace("cal.com/", "") // Remove cal.com domain
    .replace("cal.eu/", ""); // Remove cal.eu domain

  return (
    <div className="w-full h-full min-h-[600px] overflow-y-auto">
      <Cal
        calLink={calLink}
        calOrigin={isEu ? "https://cal.eu" : "https://cal.com"}
        style={{ width: "100%", height: "100%", minHeight: "600px" }}
        config={{
          layout: "month_view",
          theme: "light",
          styles: '{"branding":{"brandColor":"#000000"}}',
          hideEventTypeDetails: "false",
        }}
      />
    </div>
  );
}
