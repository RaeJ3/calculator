import "./ButtonBox.css";

export default function ButtonBox( { children } ) {
  return (
    <div className="buttonBox">
      {children}
    </div>
  );
};