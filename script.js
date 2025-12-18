document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBtn');
    const adContainer = document.getElementById('adContainer');
    const progressContainer = document.getElementById('progressContainer');
    const linkContainer = document.getElementById('linkContainer');
    const timer = document.getElementById('timer');
    const megaLink = document.getElementById('megaLink');

    const circle = document.querySelector('.progress-ring__circle');

    const computeCircumference = () => {
        const radius = circle.r.baseVal.value;
        return 2 * Math.PI * radius;
    };

    let circumference = computeCircumference();
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    window.addEventListener('resize', () => {
        circumference = computeCircumference();
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;
    });

    const urlParams = new URLSearchParams(window.location.search);
    let topicMegaLink = urlParams.get('mega');

    if (!topicMegaLink) {
        alert('ডাউনলোড লিঙ্ক পাওয়া যায়নি! ব্লগ থেকে আবার চেষ্টা করুন।');
        return;
    }

    downloadBtn.addEventListener('click', () => {
        downloadBtn.classList.add('hidden');
        adContainer.classList.remove('hidden');

        setTimeout(() => {
            progressContainer.classList.remove('hidden');

            let timeLeft = 15;
            timer.textContent = timeLeft;

            const totalTime = 15;
            const increment = circumference / totalTime;

            const countdown = setInterval(() => {
                timeLeft--;
                timer.textContent = timeLeft;

                const offset = circumference - (increment * (totalTime - timeLeft));
                circle.style.strokeDashoffset = offset;

                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    progressContainer.classList.add('hidden');
                    megaLink.href = topicMegaLink;
                    linkContainer.classList.remove('hidden');
                }
            }, 1000);
        }, 1500);
    });
});
