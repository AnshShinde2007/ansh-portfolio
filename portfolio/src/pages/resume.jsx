const Resume = () => {
  return (
    <div className="container text-white">
      <h1 className="text-warning mb-4">Resume</h1>
      <p className="mb-5">
        Below is a summary of my education and work experience. Feel free to download my resume for more details.
      </p>

      <div className="row">
        {/* Experience */}
        <div className="col-md-6 mb-4">
          <h3 className="text-warning mb-3">Experience</h3>
          <div className="card bg-dark text-white mb-3">
            <div className="card-body">
              <h5 className="card-title">Flutter Developer - XYZ Solutions</h5>
              <h6 className="card-subtitle mb-2 text-muted">2023 - Present</h6>
              <p className="card-text">
                Working on scalable cross-platform apps, integrated APIs, implemented state management using Provider and Riverpod.
              </p>
            </div>
          </div>

          <div className="card bg-dark text-white mb-3">
            <div className="card-body">
              <h5 className="card-title">Frontend Intern - ABC Tech</h5>
              <h6 className="card-subtitle mb-2 text-muted">2022 - 2023</h6>
              <p className="card-text">
                Built responsive web apps using React.js, contributed to UI/UX improvements and dashboard analytics.
              </p>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="col-md-6 mb-4">
          <h3 className="text-warning mb-3">Education</h3>
          <div className="card bg-dark text-white mb-3">
            <div className="card-body">
              <h5 className="card-title">B.E. in Computer Science</h5>
              <h6 className="card-subtitle mb-2 text-muted">2023 - 2027</h6>
              <p className="card-text">
                University of Mumbai – Focused on software engineering, app development, and project-based learning.
              </p>
            </div>
          </div>

          <div className="card bg-dark text-white mb-3">
            <div className="card-body">
              <h5 className="card-title">Higher Secondary Education</h5>
              <h6 className="card-subtitle mb-2 text-muted">2021 - 2023</h6>
              <p className="card-text">
                Maharashtra State Board – Completed with distinction, specialized in PCM + CS.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <a href="/resume.pdf" className="btn btn-warning fw-bold px-4" download>
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Resume;
