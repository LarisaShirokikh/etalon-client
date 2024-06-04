interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="mt-4 self-center rounded-lg border border-black bg-transparent text-black py-2 px-4 text-sm hover:bg-black hover:text-white transition-colors">
      {text}
    </button>
  );
};

export default Button;
