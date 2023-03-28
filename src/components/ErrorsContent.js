import React from 'react';

function ErrorsContent({ paragraphs, parasContent }) {

    let errors = {};

    parasContent.forEach((currentError) => {
        const paraIndex = currentError.ParagraphNum - 1;
        if (!errors[paraIndex]) {
            errors[paraIndex] = [];
        }
        errors[paraIndex].push(currentError);
    });

    const highlightedText = paragraphs.map((para, paraIndex) => {
        let paraErrors = errors[paraIndex] || [];
        let currentPos = 0;
        let elements = [];

        paraErrors.forEach((currentError) => {
            const start = currentError.StartPos;
            const end = currentError.EndPos;
            const errorType = currentError.ErrorType;

            // Add the text leading up to the error
            if (start > currentPos) {
                elements.push(<span key={currentPos}>{para.slice(currentPos, start)}</span>);
            }

            // Add the highlighted error text
            const errorText = para.slice(start, end);
            const highlightIndex = start + errorText.indexOf(currentError.Error);
            elements.push(<mark key={start} className={errorType}>{errorText}</mark>);

            // Update the current position
            currentPos = end;

        });

        // Add any remaining text
        if (currentPos < para.length) {
            elements.push(<span key={currentPos}>{para.slice(currentPos)}</span>);
        }

        // Return the paragraph with error highlights
        return <p key={paraIndex}>{elements}</p>;
    });

    return <div>{highlightedText}</div>;
};
export default ErrorsContent;
