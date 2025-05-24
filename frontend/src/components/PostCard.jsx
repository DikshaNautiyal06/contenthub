export default function PostCard({ post, onDelete, onEdit }) {
  return (
    <div className="border rounded p-4 mb-4 bg-black text-white shadow-lg">
      <h3 className="text-xl font-semibold">{post.title}</h3>
      <p className="my-2 text-gray-300">{post.content}</p>
      <div className="flex justify-between text-sm text-gray-400">
        <span className="italic text-brown-400">{post.category}</span>
        <span>{new Date(post.created_at).toLocaleDateString()}</span>
      </div>
      <div className="mt-4 flex space-x-3">
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-3 py-1 rounded bg-red-700 hover:bg-red-800 text-white font-semibold transition"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            className="px-3 py-1 rounded bg-brown-700 hover:bg-brown-800 text-white font-semibold transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}