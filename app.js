                // گالری تصاویر
                const galleryImages = [
            {
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sheikh_Lotf_Allah_Mosque_Isfahan.jpg/800px-Sheikh_Lotf_Allah_Mosque_Isfahan.jpg",
                title: "مسجد شیخ لطف‌الله - شاهکار معماری صفوی"
            },
            {
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Ali_Qapu_Isfahan_modified.jpg/800px-Ali_Qapu_Isfahan_modified.jpg",
                title: "کاخ عالی قاپو - اصفهان"
            },
            {
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Chehel_Sotoun_%28Isfahan%29.jpg/800px-Chehel_Sotoun_%28Isfahan%29.jpg",
                title: "کاخ چهلستون - تالار آیینه"
            },
            {
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Shah_Mosque_%28Isfahan%29.jpg/800px-Shah_Mosque_%28Isfahan%29.jpg",
                title: "مسجد امام اصفهان - گنبد باشکوه"
            },
            {
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Safavid_carpet.jpg/800px-Safavid_carpet.jpg",
                title: "قالی دوره صفوی - موزه متروپولیتن"
            }
        ];

        const gallery = document.getElementById('safavidGallery');
        
        galleryImages.forEach(img => {
            const imgContainer = document.createElement('div');
            imgContainer.style.position = 'relative';
            
            const imgElement = document.createElement('img');
            imgElement.src = img.url;
            imgElement.alt = img.title;
            imgElement.title = img.title;
            
            const caption = document.createElement('div');
            caption.style.position = 'absolute';
            caption.style.bottom = '0';
            caption.style.right = '0';
            caption.style.left = '0';
            caption.style.background = 'rgba(90, 44, 2, 0.7)';
            caption.style.color = 'white';
            caption.style.padding = '5px';
            caption.style.borderRadius = '0 0 8px 8px';
            caption.textContent = img.title;
            
            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(caption);
            gallery.appendChild(imgContainer);
        });

        // نمایش/پنهان کردن متن کامل
        function toggleText() {
            const shortText = document.getElementById('shortText');
            const fullText = document.getElementById('fullText');
            
            if (fullText.classList.contains('hidden')) {
                shortText.classList.add('hidden');
                fullText.classList.remove('hidden');
                document.querySelector('#more .read-more-btn').textContent = 'بستن △';
                
                // اسکرول به بخش متن کامل
                setTimeout(() => {
                    fullText.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                fullText.classList.add('hidden');
                shortText.classList.remove('hidden');
                document.querySelector('#more .read-more-btn').textContent = 'ادامه مطلب ▽';
            }
        }

        // اسکرول نرم برای لینک‌ها
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // تغییر هدر هنگام اسکرول
        window.addEventListener('scroll', function() {
            const header = document.getElementById('main-header');
            if (window.scrollY > 50) {
                header.style.background = "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sheikh_Lotf_Allah_Mosque_Isfahan.jpg/800px-Sheikh_Lotf_Allah_Mosque_Isfahan.jpg') center/cover";
            } else {
                header.style.background = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sheikh_Lotf_Allah_Mosque_Isfahan.jpg/800px-Sheikh_Lotf_Allah_Mosque_Isfahan.jpg') center/cover";
            }
        });

        // انیمیشن برای عناصر هنگام اسکرول
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });



<div class="credits" style="
    text-align: center;
    padding: 20px;
    background: #f0e6d2;
    border-top: 1px solid #d4a762;
    margin-top: 30px;
    font-family: 'Sahel', sans-serif;
">
    <p style="margin: 0; color: #5a2c02;">
        طراحی و توسعه توسط <strong>امیرحسین جودکی</strong>
    </p>
    <p style="margin: 10px 0 0; font-size: 0.9rem;">
        <a href="https://twitter.com/imjodaki" target="_blank" style="
            color: #5a2c02;
            text-decoration: none;
            font-weight: bold;
        ">@imjodaki</a>
    </p>
</div>


    
    document.querySelector('.credits').addEventListener('click', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 5px 15px rgba(90, 44, 2, 0.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        }, 300);
    });
        

        document.getElementById('toggle-admin').addEventListener('click', () => {
            const panel = document.getElementById('admin-panel');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        });


        document.getElementById('post-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;
            
            try {
                const response = await fetch('http://localhost:3000/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, content })
                });
                
                if (response.ok) {
                    alert('پست جدید ذخیره شد!');
                    document.getElementById('post-title').value = '';
                    document.getElementById('post-content').value = '';
                    loadPosts();
                }
            } catch (error) {
                console.error('خطا:', error);
            }
        });

        
        async function loadPosts() {
            try {
                const response = await fetch('http://localhost:3000/posts');
                const posts = await response.json();
                
                const postsList = document.getElementById('posts-list');
                postsList.innerHTML = '<h3>پست‌های ذخیره شده:</h3>';
                
                posts.forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.style.background = '#f0e6d2';
                    postDiv.style.padding = '10px';
                    postDiv.style.margin = '10px 0';
                    postDiv.style.borderRadius = '5px';
                    postDiv.innerHTML = `
                        <strong>${post.title}</strong>
                        <p>${post.content}</p>
                        <small>${new Date(post.date).toLocaleString('fa-IR')}</small>
                    `;
                    postsList.appendChild(postDiv);
                });
            } catch (error) {
                console.error('خطا در بارگیری پست‌ها:', error);
            }
        }


        