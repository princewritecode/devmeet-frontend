const UserCard = ({ user }) =>
{

    return (
        <div className="card bg-base-100 w-96 shadow-sm my-10">
            <figure>
                <img
                    src={user.photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user.firstName} {user.lastName}</h2>
                <p>{user.about}</p>
                <div className="card-actions justify-center my-6">
                    <button className="btn btn-primary">Interested</button>
                    <button className="btn btn-secondary">Ignore</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;