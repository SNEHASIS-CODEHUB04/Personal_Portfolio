// Multilingual loading messages
        const loadingMessages = [
            "নমস্তে - Explore My Creation",
            "Hello - Explore My Creation"
        ];

        // Project data
        const projects = [
            {
                title: "Collab Board",
                description: "CollabBoard is an interactive collaborative tutorial board designed for seamless learning and knowledge sharing. It is ideal for remote classrooms and group projects, enabling both teachers and students to work together visually and textually in a single platform.",
                image: "https://content-management-files.canva.com/97f6f64a-d890-455f-b31b-4bd94900822f/0001.png",
                url: "https://github.com/SNEHASIS-CODEHUB04/Collab-Board"
            },
            {
                title: "IdeaScape",
                description: "IdeaScape is a full-stack blog web application developed using React.js for the frontend and Appwrite for backend services, enabling users to create, manage, and interact with blog content in a dynamic environment.",
                image: "https://i.ytimg.com/vi/tlTdbc5byAs/maxresdefault.jpg",
                url: "https://github.com/SNEHASIS-CODEHUB04/IdeaScape"
            },
            {
                title: "Sorting Visualizer",
                description: "Sorting Visualizer is an educational tool built with JavaScript that visualizes various sorting algorithms, including Bubble Sort, Insertion Sort, Selection Sort, Merge Sort, and Quick Sort, by animating bars representing array values to demonstrate the sorting process step-by-step.",
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20200622003313/Screenshot-from-2020-06-22-00-28-06.png",
                url: "https://github.com/SNEHASIS-CODEHUB04/Sorting_Visualizer"
            },
            {
                title: "Problem Vault",
                description: "Problem Vault is a platform for storing and solving algorithmic problems, designed to help developers practice and enhance their coding skills with a focus on data structures and algorithms.",
                image: "https://media.istockphoto.com/id/2160077469/photo/digital-hud-holograms-with-a-metal-safe.webp?a=1&b=1&s=612x612&w=0&k=20&c=_rXdwEmbjoteA8dMhEycRDaGhMSblTSOKkUonQaZsrg=",
                url: "https://github.com/SNEHASIS-CODEHUB04/Problem-Vault"
            },
            {
                title: "AI Article Summarizer",
                description: "AI Article Summarizer is a web application that uses AI to generate concise summaries of articles, leveraging natural language processing to extract key points and improve content comprehension.",
                image: "https://www.summarizer.org/storage/2025/Oct/AISummarizerRevie_89.jpeg",
                url: "https://github.com/SNEHASIS-CODEHUB04/AI-ARTICLE-SUMMARISER"
            },
            {
                title: "Banker's Algorithm Simulator",
                description: "Banker's Algorithm Simulator is a tool to simulate the Banker's Algorithm for deadlock avoidance in operating systems, allowing users to input processes and resources to visualize safe states and resource allocation.",
                image: "https://afteracademy.com/images/what-is-bankers-algorithm-banner-c3a6adf38611e0f9.png",
                url: "https://github.com/SNEHASIS-CODEHUB04/Bankers_Algo_Simulator"
            }
        ];

        // Page load animation, dynamic project rendering, Matrix rain, scroll-to-top, and terminal command history
        window.addEventListener('load', () => {
            const loaderOverlay = document.getElementById('loader-overlay');
            const loaderText = document.getElementById('loader-text');
            const projectGrid = document.getElementById('project-grid');
            const canvas = document.getElementById('matrix-rain');
            const ctx = canvas.getContext('2d');
            const scrollTop = document.getElementById('scroll-top');
            let messageIndex = 0;

            // Loader text animation
            function updateLoaderText() {
                loaderText.textContent = loadingMessages[messageIndex];
                messageIndex = (messageIndex + 1) % loadingMessages.length;
            }
            updateLoaderText();
            const textInterval = setInterval(updateLoaderText, 2000);

            setTimeout(() => {
                clearInterval(textInterval);
                loaderOverlay.classList.add('hidden');
            }, 3000);

            // Terminal command history animation
            const terminalCommands = document.querySelectorAll('.terminal-command');
            const terminalOutputs = document.querySelectorAll('.terminal-output');
            const commands = [
                { command: terminalCommands[0], output: terminalOutputs[0], commandDuration: 1000, outputDuration: 500 },
                { command: terminalCommands[1], output: terminalOutputs[1], commandDuration: 1000, outputDuration: 500 },
                { command: terminalCommands[2], output: terminalOutputs[2], commandDuration: 1000, outputDuration: 500 },
                { command: terminalCommands[3], output: null, commandDuration: 2000 },
                { command: terminalCommands[4], output: null, commandDuration: 2000 }
            ];

            let totalDelay = 0;

            commands.forEach(({ command, output, commandDuration, outputDuration }, index) => {
                // Set command text
                command.textContent = command.getAttribute('data-text');
                command.style.animation = `typing ${commandDuration}ms steps(${command.getAttribute('data-text').length}, end) forwards ${totalDelay}ms, blink 0.5s step-end infinite`;

                if (output) {
                    // For the 'ls' command, links are already in HTML, so just handle animation
                    output.style.animation = `fadeIn 500ms forwards ${totalDelay + commandDuration}ms`;
                    totalDelay += commandDuration + outputDuration + 500; // Add delay for output and pause
                } else {
                    totalDelay += commandDuration + 500; // Add pause for final commands
                }

                // Add active class to trigger opacity
                setTimeout(() => {
                    command.classList.add('active');
                    if (output) {
                        setTimeout(() => {
                            output.classList.add('active');
                        }, commandDuration);
                    }
                }, totalDelay);
            });

            // Smooth scroll for terminal links
            document.querySelectorAll('.terminal-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });

            // Render projects dynamically
            projects.forEach((project, index) => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.style.setProperty('--index', index + 1);
                card.innerHTML = `
                    <div class="project-skeleton"></div>
                    <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
                    <div class="project-content">
                        <div class="project-title">${project.title}</div>
                        <div class="project-description">${project.description}</div>
                        <a href="${project.url}" target="_blank" class="project-link">View Project</a>
                    </div>
                `;
                projectGrid.appendChild(card);

                // Image loading
                const img = card.querySelector('.project-img');
                setTimeout(() => {
                    img.classList.add('loaded');
                    card.querySelector('.project-skeleton').style.display = 'none';
                }, 1000 + index * 400);
            });

            // Matrix rain effect
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'.split('');
            const fontSize = window.innerWidth < 768 ? 10 : 14;
            const columns = Math.floor(window.innerWidth / fontSize);
            const drops = Array(columns).fill(0);

            function drawMatrix() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = `${fontSize}px monospace`;
                ctx.fillStyle = document.body.classList.contains('dark-theme') ? '#00ff99' : '#00ff00';
                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    const x = i * fontSize;
                    const y = drops[i] * fontSize;
                    ctx.fillText(text, x, y);
                    if (y > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i] += Math.random() * 0.5 + 0.5;
                }
                requestAnimationFrame(drawMatrix);
            }

            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                drops.length = Math.floor(window.innerWidth / fontSize);
                drops.fill(0);
            });

            drawMatrix();

            // Scroll-to-top button visibility
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollTop.classList.add('visible');
                } else {
                    scrollTop.classList.remove('visible');
                }
            });

            // Scroll to profile picture
            scrollTop.addEventListener('click', () => {
                const profilePic = document.querySelector('.profile-pic');
                profilePic.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Dark theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });