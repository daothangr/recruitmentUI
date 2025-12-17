// Genarate Star Evaluate
function renderStar(rating = 0) {
    let html = `<div class="rating-stars display-flex">`;

    for (let i = 1; i <= 5; i++) {
        html += `
            <span class="${i <= rating ? "icon-star-yellow icon-default" : "icon-star-gray icon"}"></span>
        `;
    }

    html += `</div>`;
    return html;
}


// Create Avatar for Candidate
function generateAvatarFromName(name) {
    if (!name) return { text: "", color: "#9ca3af" };

    const words = name.trim().split(/\s+/);

    let text = "";
    if (words.length === 1) {
        text = words[0].substring(0, 2).toUpperCase();
    } else {
        text = (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase();
    }

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [
        "#f87171", "#fb923c", "#facc15",
        "#4ade80", "#22d3ee", "#60a5fa",
        "#a78bfa", "#f472b6"
    ];

    return {
        text,
        color: colors[Math.abs(hash) % colors.length]
    };
}

// Check New Candidate
function isNewCandidate(createdAt, months = 3) {
    if (!createdAt) return false;

    const createdDate = new Date(createdAt);
    const now = new Date();

    const diffMonths =
        (now.getFullYear() - createdDate.getFullYear()) * 12 + (now.getMonth() - createdDate.getMonth());

    return diffMonths < months;
}


// Render Candidate Table from Local Storage
export function renderCandidateTable(data) {
    const tbody = document.querySelector(".candidate-table tbody");
    tbody.innerHTML = "";

    data.forEach(item => {
        const tr = document.createElement("tr");
        tr.dataset.id = item.id; 

        tr.innerHTML = `
            <td class="col-checkbox">
                <input type="checkbox" class="checkbox-row">
            </td>

            <td>${item.soDienThoai || "--"}</td>
            <td>${item.nguonUngVien || "--"}</td>

            <td>
                <div class="candidate-name-cell">
                    ${
                        item.avatar
                            ? `<img src="${item.avatar}" class="candidate-avatar" />`
                            : (() => {
                                const av = generateAvatarFromName(item.hoTen);
                                return `
                                    <div 
                                        class="candidate-avatar-text"
                                        style="background-color:${av.color}"
                                    >
                                        ${av.text}
                                    </div>
                                `;
                            })()
                    }

                    <span class="candidate-name">${item.hoTen || "--"}</span>

                    ${
                        isNewCandidate(item.createdAt)
                            ? `<span class="candidate-badge-new">MỚI</span>`
                            : ""
                    }


                </div>
            </td>

            <td>${item.email || "--"}</td>
            <td>${item.chienDichTuyenDung || "--"}</td>
            <td>${item.viTriTuyenDung || "--"}</td>
            <td>${item.tinTuyenDung || "--"}</td>
            <td>${item.vongTuyenDung || "--"}</td>
            <td>${renderStar(item.danhGia)}</td>
            <td>${item.ngayUngTuyen || "--"}</td>
            <td>${item.trinhDoDaoTao || "--"}</td>
            <td>${item.noiDaoTao || "--"}</td>
            <td>${item.chuyenNganh || "--"}</td>
            <td>${item.noiLamViec || "--"}</td>
            <td>${item.nhanSuKhaiThac || "--"}</td>
            <td>${item.donViSuDung || "--"}</td>
            <td>${item.phuHopChanDung ? "✔" : "✘"}</td>
            <td>${item.khuVuc || "--"}</td>
            <td>${item.nguoiGioiThieu || "--"}</td>
            <td>${item.thongTinTiepNhan || "--"}</td>
            <td>${item.thuocKhoTiemNang ? "✔" : "✘"}</td>
        `;

        tbody.appendChild(tr);
    });
}

