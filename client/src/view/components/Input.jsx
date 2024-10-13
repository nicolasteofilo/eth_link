export const Input = ({ placeholder, handleChange, name, ...props }) => {
  return (
    <input
      placeholder={placeholder}
      step="0.0001"
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-lg p-2 outline-none bg-[#1b263b] border-none text-sm"
      {...props}
    />
  )
} 