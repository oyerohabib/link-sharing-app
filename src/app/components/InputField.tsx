import { IconType } from "react-icons";

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  icon?: IconType;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  required = false,
  placeholder = "",
  label = "",
  icon: Icon,
}) => {
  return (
    <div className="mt-4">
      {label && (
        <label htmlFor={id} className="text-xs text-dark-grey">
          {label}
        </label>
      )}
      <div className="relative flex items-center gap-3">
        {Icon && (
          <span className="absolute left-4">
            <Icon />
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          className="block w-full py-3 px-10 border border-borders rounded-lg focus:outline-none focus:ring-purple focus:border-purple"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputField;
