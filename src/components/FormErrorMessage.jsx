function FormErrorMessage({ error }) {
  return (
    <span className="flex items-center h-6 tracking-wide text-red-500 mt-1 ml-1">
      {error ? error.message : ""}
    </span>
  );
}

export default FormErrorMessage;
