function Button({
  content,
  textColor = "text-slate-700",
  bgColor = "bg-slate-100",
  hoverBg = "hover:bg-red-100",
  hoverText = "hover:text-slate-800",
  active = false,
  onClick,
}) {
  const activeStyle = active
    ? "bg-red-500 text-white"
    : `${textColor} ${bgColor}`;

  const cls = `${activeStyle} ${hoverBg} ${hoverText} 
  } border-2 hover:border-red-500 rounded-lg pt-[8px] pb-[10px] px-[20px] transition-all duration-[600ms] ease-in-out`;
  return (
    <button className={cls} onClick={onClick}>
      {content}
    </button>
  );
}

export default Button;
