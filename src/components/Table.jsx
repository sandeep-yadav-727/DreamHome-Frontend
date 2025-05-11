import React, { useState, useRef, useEffect } from 'react';
import '../styles/Table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdFilterList } from 'react-icons/md';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';


export default function Table({ columns, data }) {
    const [showDropdown, setShowDropdown] = useState(null);
    const [filterInput, setFilterInput] = useState('');
    const [filterType, setFilterType] = useState('Contains');
    const [sortConfig, setSortConfig] = useState({ column: null, direction: 'original' });
    const [columnWidths, setColumnWidths] = useState(new Array(columns.length).fill(150));
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [appliedFilters, setAppliedFilters] = useState({});
    const dropdownRef = useRef(null);
    const dropdownButtonRef = useRef(null);

    const toggleDropdown = (index) => {
        setShowDropdown((prev) => (prev === index ? null : index));
    };

    const handleSort = (columnIndex, e) => {
        e.stopPropagation();
        if (e.target.closest('.filter-list') || e.target.closest('.filter-dropdown')) {
            return;
        }
        const newDirection = getNextSortDirection(columnIndex);
        setSortConfig({ column: columnIndex, direction: newDirection });
    };

    const getNextSortDirection = (columnIndex) => {
        if (sortConfig.column === columnIndex) {
            if (sortConfig.direction === 'ascending') return 'descending';
            if (sortConfig.direction === 'descending') return 'original';
        }
        return 'ascending';
    };

    const handleFilterChange = (e, index) => {
        setFilterInput(e.target.value);
        setAppliedFilters((prev) => ({ ...prev, [index]: e.target.value !== '' }));
    };

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
    };

    const sortedData = [...data];
    if (sortConfig.direction !== 'original' && sortConfig.column !== null) {
        sortedData.sort((a, b) => {
            const aValue = a[columns[sortConfig.column].field];
            const bValue = b[columns[sortConfig.column].field];
            if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }

    const filteredData = sortedData.filter((row) => {
        return Object.values(row).some((cell) => {
            const cellValue = String(cell).toLowerCase();
            const inputValue = filterInput.toLowerCase();
            switch (filterType) {
                case 'Contains':
                    return cellValue.includes(inputValue);
                case 'Does Not Contain':
                    return !cellValue.includes(inputValue);
                case 'Equals':
                    return cellValue === inputValue;
                case 'Does Not Equal':
                    return cellValue !== inputValue;
                case 'Begins With':
                    return cellValue.startsWith(inputValue);
                case 'Ends With':
                    return cellValue.endsWith(inputValue);
                case 'Blank':
                    return cellValue === '';
                case 'Not Blank':
                    return cellValue !== '';
                default:
                    return true;
            }
        });
    });

    const totalRows = filteredData.length;
    const totalPages = Math.ceil(totalRows / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleMouseDown = (index, e) => {
        const startX = e.clientX;
        const startWidth = columnWidths[index];

        const onMouseMove = (e) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newColumnWidths = [...columnWidths];
            newColumnWidths[index] = Math.max(newWidth, 50);
            setColumnWidths(newColumnWidths);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !dropdownButtonRef.current.contains(event.target)) {
                setShowDropdown(null);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                setShowDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };


    const handleCopy = (text) => {
        console.log(text);
        navigator.clipboard.writeText(text).then(() => {
            toast.success(`"${text}" copied!`, {
                style: {
                    backgroundColor: 'var(--background-light)',
                    color: "black",
                    fontWeight: "bold"
                },
                autoClose: 2000,
            });

        });
    };

    const getCellStyle = (row) => {
        if (row.status === 'Inactive') {
            return {
                backgroundColor: '#f0f5a8d3', 
                color: 'black', 
            };
        }
        return {}; 
    };

    return (
        <div className="table-wrapper">
            <div className="table-main">
                <table className='table-tbl'>
                    <thead className="table-header">
                        <tr className="table-tr">
                            {columns.map((column, index) => (
                                <th className='table-th'
                                    key={index}
                                    style={{ width: columnWidths[index] || 'auto' }}
                                    onClick={(e) => handleSort(index, e)}
                                >
                                    <div className="header-content">
                                        <div className="header-left">
                                            <span className="header-text">
                                                {column.headerName}
                                            </span>
                                            {columns[index].sortable !== false && sortConfig.column === index && (
                                                <span className='sorting'>
                                                    {sortConfig.direction === 'ascending'
                                                        ? '↑'
                                                        : sortConfig.direction === 'descending'
                                                            ? '↓'
                                                            : ''}
                                                </span>
                                            )}
                                        </div>
                                        <div className="header-right">
                                            {column.filter !== false && (
                                                <i
                                                    className="material-symbols-rounded filter-list"
                                                    onClick={() => toggleDropdown(index)}
                                                    ref={dropdownButtonRef}
                                                >
                                                    <MdFilterList />
                                                </i>
                                            )}
                                            {showDropdown === index && column.filter !== false && (
                                                <div className={`filter-dropdown ${showDropdown === index ? 'active' : ''}`} ref={dropdownRef}>
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={filterInput}
                                                        onChange={(e) => handleFilterChange(e, index)}
                                                    />
                                                    <select
                                                        value={filterType}
                                                        onChange={handleFilterTypeChange}
                                                    >
                                                        <option>Contains</option>
                                                        <option>Does Not Contain</option>
                                                        <option>Equals</option>
                                                        <option>Does Not Equal</option>
                                                        <option>Begins With</option>
                                                        <option>Ends With</option>
                                                        <option>Blank</option>
                                                        <option>Not Blank</option>
                                                    </select>
                                                </div>
                                            )}
                                            {appliedFilters[index] && (
                                                <span className="filter-applied-dot"></span>
                                            )}
                                        </div>
                                        <div
                                            className="resize-handle"
                                            onMouseDown={(e) => handleMouseDown(index, e)}
                                        ></div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((row, rowIndex) => (
                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even' : ''}>
                                {columns.map((column, cellIndex) => (
                                    <td
                                        className='table-td'
                                        key={cellIndex}
                                        style={{
                                            width: columnWidths[cellIndex] || 'auto',
                                            ...getCellStyle(row),
                                        }}
                                        onDoubleClick={() => handleCopy(row[column.field])}
                                    >
                                        {column.cellRenderer
                                            ? column.cellRenderer({ value: row[column.field], data: row })
                                            : row[column.field]}
                                    </td>

                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination and Records per page */}
            <div className="pagination-container">
                <div className="records-per-page">
                    <label>Show</label>
                    <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <label>per Page</label>
                </div>
                <div className="pagination">
                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <i className="material-symbols-rounded back-icon"><MdArrowBack /></i>
                    </button>
                    <span className="page-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <i className="material-symbols-rounded forward-icon"><MdArrowForward /></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
