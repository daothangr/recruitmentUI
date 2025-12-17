
const tbody = document.querySelector(".candidate-table tbody");
const floatingIcon = document.getElementById("editFloatingIcon");

// ================== EDITING STATE ==================
let editingCandidateId = null;

export function setEditingCandidateId(id) {
    editingCandidateId = id;
}

export function getEditingCandidateId() {
    return editingCandidateId;
}

// ================== UI: HOVER ICON ==================
tbody.addEventListener("mouseover", (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;

    const rect = tr.getBoundingClientRect();

    floatingIcon.style.top =
        rect.top + rect.height / 2 - 22 + "px";

    floatingIcon.dataset.id = tr.dataset.id;
    floatingIcon.classList.add("show");
});

document.addEventListener("mousemove", (e) => {
    const isInsideTable = e.target.closest(".candidate-table");
    const isInsideIcon = e.target.closest("#editFloatingIcon");

    if (!isInsideTable && !isInsideIcon) {
        floatingIcon.classList.remove("show");
    }
});

// ================== HELPER ==================
function setValue(id, value) {
    const input = document.getElementById(id);
    if (input) input.value = value ?? "";
}

// ================== CLICK EDIT ==================
floatingIcon.addEventListener("click", () => {
    const id = Number(floatingIcon.dataset.id);
    setEditingCandidateId(id);

    const list = JSON.parse(localStorage.getItem("candidateList")) || [];
    const candidate = list.find(item => item.id === id);
    if (!candidate) return;

    setValue("soDienThoai", candidate.soDienThoai);
    setValue("nguonUngVien", candidate.nguonUngVien);
    setValue("hoTen", candidate.hoTen);
    setValue("email", candidate.email);
    setValue("ngayUngTuyen", candidate.ngayUngTuyen);
    setValue("trinhDoDaoTao", candidate.trinhDoDaoTao);
    setValue("noiDaoTao", candidate.noiDaoTao);
    setValue("chuyenNganh", candidate.chuyenNganh);
    setValue("noiLamViec", candidate.noiLamViec);
    setValue("nhanSuKhaiThac", candidate.nhanSuKhaiThac);
    setValue("donViSuDung", candidate.donViSuDung);
    setValue("chienDichTuyenDung", candidate.chienDichTuyenDung);
    setValue("viTriTuyenDung", candidate.viTriTuyenDung);
    setValue("tinTuyenDung", candidate.tinTuyenDung);
    setValue("vongTuyenDung", candidate.vongTuyenDung);

    const kho = document.getElementById("thuocKhoTiemNang");
    if (kho) kho.checked = !!candidate.thuocKhoTiemNang;

    document.getElementById("addCandidateModal").classList.add("active");
});
