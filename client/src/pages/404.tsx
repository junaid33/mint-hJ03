export function ErrorPage() {
  return (
    <main className="h-screen bg-[#0f1117]">
      <article className="bg-custom bg-fixed bg-center bg-cover relative flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-xl px-10">
          <span className="inline-flex mb-6 rounded-full bg-green-600 bg-opacity-50 px-3 py-1 text-sm font-semibold">
            Error&nbsp;404
          </span>
          <h1 className="font-semibold mb-3 text-3xl">
            Well this is embarrassing…
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            We can't find the page you are looking for. Please <a href="mailto:hi@mintlify.com" className="font-medium text-gray-100 border-b hover:border-b-[2px] border-slate-500">contact support</a> or go to <a href="https://mintlify.com" className="font-medium text-gray-100 border-b hover:border-b-[2px] border-slate-500">mintlify.com</a> to find what you&nbsp;need.
          </p>
        </div>
      </article>
    </main>
  );
}

export default function Error() {
  return <ErrorPage />;
}

Error.layoutProps = {
  meta: {
    title: '404',
  },
};
