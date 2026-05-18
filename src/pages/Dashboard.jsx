import Calculator from "../components/calculator/Calculator";

function Dashboard() {

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#0f172a",
                padding: "30px",
                color: "white"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px"
                }}
            >

                <h1
                    style={{
                        fontSize: "32px",
                        fontWeight: "bold"
                    }}
                >
                    Smart Calculator Dashboard
                </h1>

                <button
                    onClick={() => {

                        localStorage.removeItem("token");

                        window.location.href = "/";

                    }}
                    style={{
                        padding: "10px 20px",
                        background: "#dc2626",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    Logout
                </button>

            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >

                <Calculator />

            </div>

        </div>
    );
}

export default Dashboard;