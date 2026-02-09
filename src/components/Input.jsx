function Input({ variant, ...props }) {
  const variants = {
    title: "h-15",
    description: "h-40",
  };

  return (
    <textarea
      className={`border-2 border-black/20 rounded-md bg-slate-50 w-full resize-none p-2 ${variants[variant]} `}
      {...props}
    />
  );
}

export default Input;
