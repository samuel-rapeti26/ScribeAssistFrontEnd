import React, { useEffect, useState } from "react";

const ErrorsContent = ({ paragraphs,parasContent}) => {
 
  const [highlightedErrors, setHighlightedErrors] = useState({});
  useEffect(() => {
    highlightErrors();
  },[paragraphs]);
  const highlightErrors = () => {
    const map={};
     paragraphs.forEach((paragraph) => {
      let { paraContent,  error, suggestion,StartPos } = paragraph;
      paraContent= map[paragraph.ParagraphNum]|| paraContent;
      const errorPos = paraContent.indexOf(error,StartPos);

      // If the error is not found in the paragraph, skip it
      if (errorPos === -1) {
        return paragraph;
      }
      
      const beforeError = paraContent.substring(0, errorPos);
      const afterError = paraContent.substring(errorPos + error.length);
      const errorSpan = `<span class="text-white bg-yellow-500 py-1">${error}</span>`;
      const highlightedParagraph = beforeError + errorSpan + afterError;
      if(error== "is"){
        console.log("paraContent, beforeError,afterError, errorPos98",paraContent, beforeError,afterError, errorPos);
      }
      map[paragraph.ParagraphNum]= highlightedParagraph;
    });

    setHighlightedErrors(map);
  };
  return (
    <div>
      {parasContent.map((paragraph,i) => (
        <span key={i} dangerouslySetInnerHTML={{ __html: highlightedErrors[i+1]||paragraph }} />
      ))}
    </div>
  );
};
export default ErrorsContent;
