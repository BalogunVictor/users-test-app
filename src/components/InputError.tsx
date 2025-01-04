import React from "react";

function InputError({ message }: { message: string }) {
    return (
      <div className="flex items-center gap-x-2 py-1 pl-2">
        <p color="text-red-500">{message}</p>
      </div>
    );
  }
  
  export default InputError;
  