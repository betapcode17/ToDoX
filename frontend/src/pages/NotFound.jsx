import React from "react";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center min-h-screen bg-slate-50">
        <img
          src="/404_NotFound.png"
          alt="ページが見つかりません"
          className="max-w-full mb-6 w-96"
        />
        <p className="text-xl font-semibold">ここは立ち入り禁止です</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 mt-6 font-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark"
        >
          ホームに戻る
        </Link>
      </div>
    </>
  );
};

export default NotFound;
