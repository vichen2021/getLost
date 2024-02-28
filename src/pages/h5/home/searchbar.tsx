
/**
 * SearchBar
 */
import { useState } from 'react';
import res from '../../../atoms/res';

export default function Searchbar() {
	const [expanded, setExpanded] = useState(false);

	const toggleSearch = () => {
		setExpanded(!expanded);
	};

	return (
		<div className={`search-container ${expanded ? 'expanded' : ''}`}>
			<img
				className="search-icon"
				src={res['/images/h5/search-normal.svg']} // 替换为您的图片路径
				alt="Search Icon"
				onClick={toggleSearch}
			/>
			<input
				type="text"
				id="search-input"
				placeholder="搜索..."
				onBlur={() => setExpanded(false)}
			/>

			<style jsx>{`
 .search-container {
  position: relative;
  width: 30px;
  transition: width 0.3s;
  display: flex;
  float: right;
margin-top: 12px;
}

#search-input {
  width: 0;
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: width 0.3s, opacity 0.3s;
  opacity: 0;
  pointer-events: none;
}

.search-icon {
  position: absolute;
  top: 8px;
  left: 0;
  width: 16px;
  height: 16px;
  background-image: url('/01factory/src/pages/h5/home/search-normal.png'); /* 替换为你的图片路径 */
  background-size: cover;
  cursor: pointer;
  transition: transform 0.3s;
}

.search-icon::before {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  margin: 4px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
}

.expanded {
  width: 200px;
}

.expanded #search-input {
  width: 200px;
  opacity: 1;
  pointer-events: auto;
}

.expanded .search-icon {
  opacity: 0;
}


      `}</style>
		</div>
	);
}
