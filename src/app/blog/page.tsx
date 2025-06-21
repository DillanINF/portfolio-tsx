import React from "react";

function Page() {
  return (
    <div className="container mx-auto text-zinc-300 flex justify-center items-center h-full">
      <div
        className="text-3xl"
        role="heading"
        aria-level={1}
      >
        Oops no blog posts!
      </div>
    </div>
  );
}

export default Page;
