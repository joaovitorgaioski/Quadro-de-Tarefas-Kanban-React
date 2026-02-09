function Section(props) {
  return (
    <div className="flex-1 h-full flex flex-col text-center bg-amber-50 rounded-md p-5 overflow-hidden" {...props}>
      {props.children}
    </div>
  );
}

export default Section;