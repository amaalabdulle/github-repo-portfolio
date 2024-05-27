import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function SingleRepo() {
    const { repoName } = useParams();
    const [repository, setRepository] = useState(null);

    useEffect(() => {
        const username = 'amaalabdulle';

        const fetchRepository = () => {
            fetch(`https://api.github.com/repos/${username}/${repoName}`)
                .then((repoResponse) => {
                    if (!repoResponse.ok) {
                        throw new Error('Failed to load Repository!');
                    }
                    console.log(repoResponse);
                    return repoResponse.json();
                })
                .then((repoData) => {
                    setRepository(repoData);
                })
                .catch((error) => {
                    console.error('Error fetching repository:', error);
                });
        };

        fetchRepository();
    }, [repoName]);

    if (!repository) {
        return <div>Loading...</div>;
    }

    const websiteUrl = repository.homepage;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <h1 className="card-title">{repository.name}</h1>
                            <p className="card-subtitle mb-2 text-muted">{repository.description}</p>
                            <a href={repository.html_url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                View on GitHub
                            </a>
                            {websiteUrl && (
                                <div className="mt-4">
                                    <h2>Website Preview</h2>
                                    <iframe
                                        src={websiteUrl}
                                        title="Project Website Preview"
                                        style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Repository Details</h3>
                            <ul className="list-group list-group-flush text-center">
                                <li className="list-group-item"><strong>Owner:</strong> {repository.owner.login}</li>
                                <li className="list-group-item"><strong>Stars:</strong> {repository.stargazers_count}</li>
                                <li className="list-group-item"><strong>Forks:</strong> {repository.forks_count}</li>
                                <li className="list-group-item"><strong>Open Issues:</strong> {repository.open_issues_count}</li>
                                <li className="list-group-item"><strong>Language:</strong> {repository.language}</li>
                                <li className="list-group-item"><strong>Created At:</strong> {new Date(repository.created_at).toLocaleDateString()}</li>
                                <li className="list-group-item"><strong>Last Push:</strong> {new Date(repository.pushed_at).toLocaleDateString()}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleRepo;




