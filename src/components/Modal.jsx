function Modal(props) {
  return (
    <div
      className="bg-black/50 z-10 fixed inset-0 flex justify-center items-center"
      {...props}
    >
      <div
        className="bg-amber-50 rounded-md p-5 space-y-6 h-[80%] w-full max-w-md shadow-2xl flex flex-col"
        {...props}
      >
        {props.children}
      </div>
    </div>
  );
}
export default Modal;
