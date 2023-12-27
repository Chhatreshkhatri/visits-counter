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
    passKey: "passKey",
    setCount: "1",
  });

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copyLink, setCopyLink] = useState("");
  const [showGeneratedImage, setShowGeneratedImage] = useState(false);

  const handleButtonHover = () => {
    setIsButtonHovered(true);
  };

  const handleButtonLeave = () => {
    setIsButtonHovered(false);
  };

  useEffect(() => {
    console.log("Form state updated:", formState);
    setGeneratedLink(generateLink(formState));
  }, [formState]);

  const generateCopyLink = (formData) => {
    return `https://visits.chhatreshkhatri.com/${formData.label}?label=${formData.label}&shadowLabel=${formData.shadowLabelColor}&shadowCount=${formData.shadowCountColor}&opacity=${formData.opacity}&swap=${formData.swap}&labelBG=${formData.labelBGColor}&countBG=${formData.countBGColor}&labelText=${formData.labelTextColor}&countText=${formData.countTextColor}&visits=${formData.visits}&passKey=${formData.passKey}&setCount=${formData.setCount}`;
  };

  const handleGenerateLink = () => {
    setGeneratedLink(generateLink(formState));
    setCopyLink(generateCopyLink(formState));
    setShowGeneratedImage(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(copyLink)
      .then(() => {
        console.log("Link copied to clipboard:", copyLink);
      })
      .catch((err) => {
        console.error("Error copying link to clipboard:", err);
      });
  };

  const generateLink = (formData) => {
    return `https://visits.chhatreshkhatri.com/${formData.label}?label=${formData.label}&shadowLabel=${formData.shadowLabelColor}&shadowCount=${formData.shadowCountColor}&opacity=${formData.opacity}&swap=${formData.swap}&labelBG=${formData.labelBGColor}&countBG=${formData.countBGColor}&labelText=${formData.labelTextColor}&countText=${formData.countTextColor}&visits=${formData.visits}&passKey=${formData.passKey}&setCount=${formData.setCount}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerateLink();
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
      {/* Generate and Copy buttons */}
      <div className="w-full col-span-2 flex flex-col">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleGenerateLink}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2 focus:outline-none focus:shadow-outline whitespace-nowrap">
            Generate Link
          </button>
          {showGeneratedImage && <img src={generatedLink} alt="Generated link" className=" h-12 m-2" />}
        </div>

        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={handleCopyLink}
            className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded mt-2 focus:outline-none focus:shadow-outline"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}>
            Copy Link
          </button>
          {isButtonHovered && <div className="text-sm text-gray-500 whitespace-nowrap">{copyLink}</div>}
        </div>
      </div>
    </div>
  );
};

export default MyForm;
