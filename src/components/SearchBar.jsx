import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange, placeholder = "Pesquisar..." }) => {
    return (
        <div className="input-group">
            <span className="input-group-text bg-dark text-white border-secondary">
                <FaSearch />
            </span>
            <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;