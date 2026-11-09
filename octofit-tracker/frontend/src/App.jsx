function App() {
  return (
    <main className="container py-5">
      <header className="d-flex align-items-center gap-3 mb-5">
        <img
          src="/octofitapp-small.png"
          alt="OctoFit Tracker"
          width="64"
          height="64"
        />
        <div>
          <h1 className="mb-1">OctoFit Tracker</h1>
          <p className="text-body-secondary mb-0">
            Your fitness tracking application is ready to build.
          </p>
        </div>
      </header>

      <section className="card shadow-sm">
        <div className="card-body">
          <h2 className="h5 card-title">Application status</h2>
          <p className="card-text mb-0">
            The React frontend is running. API services are available on port
            8000.
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
