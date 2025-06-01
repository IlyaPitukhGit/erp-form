export async function postUserForm(data: unknown): Promise<{ status: string }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldFail = Math.random() < 0.2;
            if (shouldFail) {
                reject(new Error("Server error"));
            } else {
                console.log("API response simulation:", data);
                resolve({ status: "success" });
            }
        }, 2000);
    });
}
