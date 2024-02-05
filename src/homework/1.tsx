import React, { useEffect, useRef } from "react";
type Props = {
  children: React.ReactElement;
  onContentEndVisible: () => void;
};
// Опишіть Props
export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Тип об'єкту options вже описаний бібліотекою, його потрібно просто використати https://learn.microsoft.com/en-us/previous-versions/mt806169(v=vs.85)
    // const options: IntersectionObserverInit = {
    //   rootMargin: '0px',
    //   threshold: 1.0,
    //   root: null,
    // };
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
