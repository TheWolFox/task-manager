export function Header() {
    return (<header className="app-header">
            <div className="brand-plaque">
              <span className="brand-nail nail-top-left" aria-hidden="true" />
              <span className="brand-nail nail-top-right" aria-hidden="true" />
              <span className="brand-nail nail-bottom-left" aria-hidden="true" />
              <span className="brand-nail nail-bottom-right" aria-hidden="true" />
    
              <div className="brand-clip" aria-hidden="true" />
    
              <div className="brand-heading">
                <svg
                  className="brand-icon"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M11 7H26M11 16H26M11 25H26"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="square"
                  />
                  <path
                    d="M5 7H6M5 16H6M5 25H6"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="square"
                  />
                </svg>
    
                <h1 className="brand-title">TASK MANAGER</h1>
              </div>
    
              <p className="brand-subtitle">YOUR LITTLE PRODUCTIVITY CORNER</p>
            </div>
          </header>
    );
}