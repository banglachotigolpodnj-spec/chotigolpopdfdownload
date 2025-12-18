<script>
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBtn');
    const adContainer = document.getElementById('adContainer');
    const progressContainer = document.getElementById('progressContainer');
    const linkContainer = document.getElementById('linkContainer');
    const timer = document.getElementById('timer');
    const megaLink = document.getElementById('megaLink');
    const circle = document.querySelector('.progress-ring__circle');

    // সার্কুলার প্রগ্রেস ক্যালকুলেশন
    const computeCircumference = () => {
        const radius = circle.r.baseVal.value;
        return 2 * Math.PI * radius;
    };

    let circumference = computeCircumference();
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    // রিসাইজে প্রগ্রেস রিসেট
    window.addEventListener('resize', () => {
        circumference = computeCircumference();
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;
    });

    // URL থেকে Mega লিঙ্ক নেওয়া
    const urlParams = new URLSearchParams(window.location.search);
    let topicMegaLink = urlParams.get('mega');

    if (!topicMegaLink) {
        alert('ডাউনলোড লিঙ্ক পাওয়া যায়নি! ব্লগ থেকে আবার চেষ্টা করুন।');
        return;
    }

    // মেইন ক্লিক ফাংশন – এখানে ৩টা অ্যাড ট্রিগার
    downloadBtn.addEventListener('click', () => {
        // বাটন হাইড করা
        downloadBtn.classList.add('hidden');

        // অ্যাড কন্টেইনার দেখানো + সতর্ক মেসেজ
        adContainer.classList.remove('hidden');
        adContainer.innerHTML = `
            <p style="color:#00ff00; font-weight:bold; font-size:18px;">
                ✅ ৩টি বিজ্ঞাপন নতুন ট্যাবে ওপেন হচ্ছে...<br>
                দয়া করে বন্ধ করবেন না! অপেক্ষা করুন...
            </p>
        `;

        // ৩টা অ্যাড পপআন্ডার ওপেন করা (তোমার Adsterra লিঙ্ক)
        window.open('https://footweargrewshaped.com/cqcbyvnv?key=1a1f32833e4e894b2843db28fabc882c', '_blank');
        window.open('https://otieu.com/4/10345381', '_blank');
        window.open('https://footweargrewshaped.com/jn2mprdtig?key=cd8dd43c9e06eef4d173229929c3831b', '_blank');

        // অ্যাড লোড হওয়ার জন্য সামান্য ডিলে (১.৫ সেকেন্ড)
        setTimeout(() => {
            progressContainer.classList.remove('hidden');

            let timeLeft = 15; // টাইমার সেকেন্ড
            timer.textContent = timeLeft;

            const totalTime = 15;
            const increment = circumference / totalTime;

            const countdown = setInterval(() => {
                timeLeft--;
                timer.textContent = timeLeft;

                // প্রগ্রেস সার্কেল অ্যানিমেশন
                const offset = circumference - (increment * (totalTime - timeLeft));
                circle.style.strokeDashoffset = offset;

                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    progressContainer.classList.add('hidden');

                    // Mega লিঙ্ক দেখানো
                    megaLink.href = topicMegaLink;
                    linkContainer.classList.remove('hidden');
                }
            }, 1000);
        }, 1500);
    });
});
</script>
