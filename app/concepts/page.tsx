import React from "react";

const Page = () => {
  return (
    <div
      className="
        w-full
        rounded-2xl
        min-h-[calc(100vh-8rem)]
        p-3

        /* Small screens */
        sm:min-h-[calc(100vh-8rem)]
        sm:p-4

        /* Tablet */
        md:min-h-[calc(100vh-7.5rem)]
        md:p-4

        /* Large screen — existing style */
        lg:h-[calc(100vh-7rem)]
        lg:p-3
        lg:border border-white/10
      "
    >
      page
    </div>
  );
};

export default Page;
