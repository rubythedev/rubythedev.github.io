document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelectorAll(".project");

    if (!projects.length) {
        console.error("No projects found in the DOM.");
        return;
    }

    // Fade-in effect using Intersection Observer
    const fadeInObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        },
        {
            threshold: 0.1, // Trigger when 10% of the element is visible
        }
    );

    projects.forEach((project) => fadeInObserver.observe(project));

    // Dynamic image movement
    projects.forEach((project) => {
        const image = project.querySelector("img");

        if (!image) {
            console.warn("No image found in project:", project);
            return;
        }

        project.addEventListener("mousemove", (event) => {
            const rect = project.getBoundingClientRect();
            const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 20; // -10 to +10 range
            const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 20;

            image.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.1)`; // Add scale effect
        });

        project.addEventListener("mouseleave", () => {
            image.style.transform = "translate(0, 0) scale(1)"; // Reset position and scale
        });
    });

    // Force reload of observer (for first load issues)
    setTimeout(() => {
        projects.forEach((project) => {
            fadeInObserver.observe(project);
        });
    }, 100);
});
