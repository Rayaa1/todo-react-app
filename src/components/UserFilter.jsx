export default function UserFilter({ users, selectedUser, onChange }) {
  return (
    <div className="control-group">
      <label>Filter by user</label>
      <select value={selectedUser} onChange={(e) => onChange(e.target.value)}>
        <option value="all">All users</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </select>
    </div>
  );
}
