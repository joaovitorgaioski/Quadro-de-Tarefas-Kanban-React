function Button({children, variant="primary", className, ...props}) {

  const variants = {
    primary: "bg-red-400 hover:bg-red-500 max-w-30",
    task: "border-2 border-black/20 m-1 md:m-2 hover:bg-amber-50",
    submit: "bg-green-400 hover:bg-green-500 min-w-20",
  };

  return (
    <button className={`p-2 text-black rounded-md shadow-lg cursor-pointer border-2 border-black/20 transition-all hover:-translate-1 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
