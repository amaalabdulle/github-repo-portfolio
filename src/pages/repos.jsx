import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './App.css';

function Repos() {
    const [repositories, setRepositories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [reposPerPage] = useState(6);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function fetchRepositories(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                } else {
                    throw new Error('Failed to load Repositories!');
                }
            });
    }

    useEffect(() => {
        const username = 'amaalabdulle';
        setLoading(true);
        fetchRepositories(username)
            .then(data => {
                setRepositories(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error setting repositories:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (filterValue) => {
        setFilter(filterValue);
    };

    const filteredRepos = repositories.filter(repo => {
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || repo.language === filter;
        return matchesSearch && matchesFilter;
    });

    const indexOfLastRepo = currentPage * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
    const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
            {/* <h1>GitHub Repositories</h1> */}
            <div className="mb-4 d-flex align-items-center">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search repositories..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="dropdown">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-funnel"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <button className="dropdown-item" onClick={() => handleFilterChange('all')}>All Languages</button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => handleFilterChange('JavaScript')}>JavaScript</button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => handleFilterChange('Python')}>Python</button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => handleFilterChange('Java')}>Java</button>
                        </li>
                    </ul>
                </div>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div className="row">
                    {currentRepos.map(repository => (
                        <div className="col-md-6 col-lg-4 mb-4" key={repository.id}>
                            <div className="card h-100">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{repository.name}</h5>
                                    <p className="card-subtitle mb-2 text-muted">{repository.description}</p>
                                    <Link to={`/repos/${repository.name}`} className="mt-auto btn btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <nav>
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(filteredRepos.length / reposPerPage) }, (_, index) => (
                        <li key={index} className="page-item">
                            <button onClick={() => paginate(index + 1)} className="page-link">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Repos;



