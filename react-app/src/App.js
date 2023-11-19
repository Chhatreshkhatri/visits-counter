import React, { useState, useEffect } from "react";
import SvgBadge from "./svgBadge";

const MyForm = () => {
  const [formState, setFormState] = useState({
    label: "Visits",
    shadowLabelColor: "00000000",
    shadowCountColor: "00000000",
    opacity: "30",
    swap: "0",
    labelBGColor: "484848",
    countBGColor: "1CA2F1",
    labelTextColor: "FFFFFF",
    countTextColor: "FFFFFF",
    visits: "1",
    passKey: "",
    setCount: "1",
  });

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleButtonHover = () => {
    setIsButtonHovered(true);
  };

  const handleButtonLeave = () => {
    setIsButtonHovered(false);
  };

  useEffect(() => {
    console.log("Form state updated:", formState);
  }, [formState]);

  const handleCopyLink = () => {
    const link = generateLink(formState);
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("Link copied to clipboard:", link);
      })
      .catch((err) => {
        console.error("Error copying link to clipboard:", err);
      });
  };

  const generateLink = (formData) => {
    return `https://example.com/?label=${formData.label}&shadowLabel=${formData.shadowLabelColor}&...`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    handleCopyLink(); // Copy link when form is submitted
  };

  return (
    <div className="flex flex-col items-center justify-center container mx-auto gap-y-6">
      <div className="flex sticky justify-center items-center h-20 w-full">
        <SvgBadge
          label={formState.label}
          shadowLabelColor={formState.shadowLabelColor}
          shadowCountColor={formState.shadowCountColor}
          opacity={formState.opacity}
          swap={formState.swap}
          labelBGColor={formState.labelBGColor}
          countBGColor={formState.countBGColor}
          labelTextColor={formState.labelTextColor}
          countTextColor={formState.countTextColor}
          visits={formState.visits}
        />
      </div>
      <div className="flex">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-[320px]">
          {/* Render input fields dynamically */}
          {Object.entries(formState).map(([fieldName, fieldValue]) => (
            <div key={fieldName} className="flex flex-col">
              <label className="text-gray-700 text-sm font-bold w-24" htmlFor={fieldName}>
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
              </label>
              <input
                type="text"
                id={fieldName}
                name={fieldName}
                value={fieldValue}
                className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setFormState((prevState) => ({ ...prevState, [fieldName]: e.target.value }))}
              />
            </div>
          ))}
        </form>
      </div>
      {/* Submit button */}
      <div className="w-full col-span-2 flex flex-col items-center justify-center" onMouseEnter={handleButtonHover} onMouseLeave={handleButtonLeave}>
        <button
          type="button"
          onClick={handleCopyLink}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline">
          Copy Link
        </button>
        <div className="text-sm text-gray-500" style={{ visibility: isButtonHovered ? "visible" : "hidden" }}>
          {generateLink(formState)}
        </div>
      </div>
    </div>
  );
};

export default MyForm;
