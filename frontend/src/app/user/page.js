import Link from "next/link";

export default function page() {
  return (
    <>
      <div>
        <button className="bg-white text-black">
          <a href="user/login">login</a>
        </button>
        
        <button className="bg-white text-black">
          <a href="user/signup">signup</a>
        </button>
      </div>
    </>
  );
}
