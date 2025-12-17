
import { restartPagination } from "./pagination.js";
import {getEditingCandidateId, setEditingCandidateId } from "./updateCandidate.js";

const openBtn = document.getElementById("button-add-candidate");
const modal = document.getElementById("addCandidateModal");
const closeBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelModal");
const saveBtn = document.querySelector(".popup-footer-save");

// ================== MODAL ==================
openBtn.onclick = () => {
    setEditingCandidateId(null); // reset EDIT state
    resetForm();
    modal.classList.add("active");
};

closeBtn.onclick = cancelBtn.onclick = () => {
    closeModal();
};

// ================== HELPERS ==================
function closeModal() {
    modal.classList.remove("active");
}

function getValue(id) {
    const i = document.getElementById(id);
    return i ? i.value.trim() : "";
}

function resetForm() {
    modal.querySelectorAll("input").forEach(i => {
        if (i.type === "checkbox") i.checked = false;
        else i.value = "";
    });
}

// ================== SAVE ==================
saveBtn.addEventListener("click", () => {
    const list = JSON.parse(localStorage.getItem("candidateList")) || [];

    const candidate = {
        soDienThoai: getValue("soDienThoai"),
        nguonUngVien: getValue("nguonUngVien"),
        hoTen: getValue("hoTen"),
        email: getValue("email"),
        ngayUngTuyen: getValue("ngayUngTuyen"),
        trinhDoDaoTao: getValue("trinhDoDaoTao"),
        noiDaoTao: getValue("noiDaoTao"),
        chuyenNganh: getValue("chuyenNganh"),
        noiLamViec: getValue("noiLamViec"),
        nhanSuKhaiThac: getValue("nhanSuKhaiThac"),
        khuVuc: getValue("khuVuc"),
        nguoiGioiThieu: getValue("nguoiGioiThieu"),
        phuHopChanDung: false,
        thuocKhoTiemNang:
            document.getElementById("thuocKhoTiemNang")?.checked || false
    };

    if (!candidate.hoTen || !candidate.soDienThoai) {
        alert("Nhập sđt và họ tên");
        return;
    }

    const editingId = getEditingCandidateId();

    // ================== UPDATE ==================
    if (editingId !== null) {
        const index = list.findIndex(item => item.id === editingId);
        if (index === -1) {
            alert("Không tìm thấy ứng viên");
            return;
        }

        list[index] = {
            ...list[index],
            ...candidate,
            id: editingId,
            updatedAt: new Date().toISOString()
        };

        setEditingCandidateId(null);
    }
    // ================== ADD ==================
    else {
        const maxId =
            list.length > 0 ? Math.max(...list.map(item => item.id)) : 0;

        list.unshift({
            ...candidate,
            id: maxId + 1,
            createdAt: new Date().toISOString()
        });
    }

    localStorage.setItem("candidateList", JSON.stringify(list));
    closeModal();
    restartPagination();
});
