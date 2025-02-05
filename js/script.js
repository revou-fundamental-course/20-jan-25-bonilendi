
// Responsive Navbar
	const tombol = document.querySelector('.tombol');
	const menu = document.querySelector('.menu');
		
// event click pada saat menampilkan Responsive Navbar
// pada saat tombol di click, menambahkan class aktif pada class menu
// saat diklik lagi,  class aktif dihilangkan dari class menu (toggle)
  tombol.addEventListener('click', () => {
	menu.classList.toggle('aktif');
		});


// Objek untuk menyimpan kategori BMI dan pesan terkaitnya
const BMI_CATEGORIES = {
  UNDERWEIGHT: 'Kekurangan berat badan',
  NORMAL: 'Normal (ideal)',
  OVERWEIGHT: 'Kelebihan berat badan',
  OBESITY: 'Kegemukan (Obesitas)',
};

// Fungsi untuk menghitung BMI berdasarkan berat badan dan tinggi badan
const calculateBMI = (weight, height) => {
  let bmi = weight / ((height / 100) ** 2);

  return bmi.toFixed(1);
};

// Fungsi untuk memvalidasi input berat badan, tinggi badan, usia, dan jenis kelamin
const validateInput = (weight, height, age, gender) => {
  // Mengambil elemen error message untuk masing-masing input
  const genderErrorMessage = document.getElementById('genderErrorMessage');
  const weightErrorMessage = document.getElementById('weightErrorMessage');
  const ageErrorMessage = document.getElementById('ageErrorMessage');
  const heightErrorMessage = document.getElementById('heightErrorMessage');

  // Mengatur pesan error menjadi kosong untuk mereset pesan error sebelumnya
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((element) => (element.innerText = ''));

  let isValid = true;

  // Validasi jenis kelamin
  if (gender === '' || !['Pria', 'Wanita'].includes(gender)) {
    genderErrorMessage.innerText = 'Pilih jenis kelamin terlebih dahulu';
    isValid = false;
  }

  // Validasi berat badan
  if (isNaN(weight) || weight <= 0) {
    weightErrorMessage.innerText = 'Berat badan harus berupa angka lebih dari 0';
    isValid = false;
  }

  // Validasi tinggi badan
  if (isNaN(height) || height <= 0) {
    heightErrorMessage.innerText = 'Tinggi badan harus berupa angka lebih dari 0';
    isValid = false;
  }

  // Validasi usia
  if (isNaN(age) || age <= 0) {
    ageErrorMessage.innerText = 'Umur harus berupa angka lebih dari 0';
    isValid = false;
  }

  return isValid;
};

// Fungsi untuk mengecek status BMI berdasarkan nilai BMI dan jenis kelamin
const checkStatus = (bmi, gender) => {
  let status = '';

  // Menentukan status BMI berdasarkan kategori dan nilai BMI
  switch (gender) {
    case 'Pria':
      if (bmi < 18.5) {
        status = BMI_CATEGORIES.UNDERWEIGHT;
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = BMI_CATEGORIES.NORMAL;
      } else if (bmi >= 25.0 && bmi <= 29.9) {
        status = BMI_CATEGORIES.OVERWEIGHT;
      } else if (bmi >= 30.0) {
        status = BMI_CATEGORIES.OBESITY;
      }
      break;
    case 'Wanita':
      if (bmi < 17) {
        status = BMI_CATEGORIES.UNDERWEIGHT;
      } else if (bmi >= 17 && bmi <= 23.9) {
        status = BMI_CATEGORIES.NORMAL;
      } else if (bmi >= 23.0 && bmi <= 27.0) {
        status = BMI_CATEGORIES.OVERWEIGHT;
      } else if (bmi > 27.0) {
        status = BMI_CATEGORIES.OBESITY;
      }
      break;
  }

  return status;
};

// Fungsi untuk mendapatkan deskripsi teks berdasarkan status BMI
const getDescText = (status) => {
  if (status === BMI_CATEGORIES.UNDERWEIGHT) {
    return 'Anda memiliki berat badan kurang dari normal.';
  } else if (status === BMI_CATEGORIES.NORMAL) {
    return 'Anda memiliki berat badan dalam kisaran normal.';
  } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
    return 'Anda memiliki berat badan berlebih.';
  } else if (status === BMI_CATEGORIES.OBESITY) {
    return 'Anda memiliki berat badan yang sangat berlebih.';
  }
};

// Fungsi untuk mendapatkan teks saran berdasarkan status BMI
const getSuggestionText = (status) => {
  if (status === BMI_CATEGORIES.UNDERWEIGHT) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menambah berat badan hingga batas normal.';
  } else if (status === BMI_CATEGORIES.NORMAL) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda memiliki berat badan yang sehat.';
  } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.';
  } else if (status === BMI_CATEGORIES.OBESITY) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk mengurangi berat badan hingga batas normal.';
  }
};

// Fungsi untuk mendapatkan teks saran gizi berdasarkan status BMI
const getAdviceText = (status) => {
  if (status === BMI_CATEGORIES.UNDERWEIGHT) {
    return 'Perbanyak asupan makanan bergizi dan konsultasikan dengan ahli gizi untuk peningkatan berat badan.';
  } else if ( status === BMI_CATEGORIES.NORMAL) {
    return 'Lanjutkan gaya hidup sehat dengan pola makan seimbang dan olahraga teratur.';
  } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
    return 'Lakukan penyesuaian pola makan dan rutin berolahraga untuk menurunkan berat badan.';
  } else if (status === BMI_CATEGORIES.OBESITY) {
    return 'Segera konsultasikan dengan ahli gizi untuk penurunan berat badan yang sehat.';
  }
};


// Fungsi untuk menghitung BMI
  function checkBMI() {
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const weight = document.getElementById('weight').value;
  const age = document.getElementById('age').value;
  const height = document.getElementById('height').value;

  if (!weight || !age || !height) {
      alert("Semua field harus diisi!");
    return;
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    const status = checkStatus(bmi, gender);
    generateDisplay(bmi, status);

    addDataToTable(gender, weight, age, height, bmi);

    displayResult(gender, weight, age, height, bmi);
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' })

// Menyembunyikan form dan menampilkan hasil
    document.getElementById('form').reset();
    document.getElementById('result').classList.remove('result-hidden');
    document.getElementById('home').classList.add('result-hidden');
  };

// Fungsi untuk menambahkan data ke tabel
function addDataToTable(gender, weight, age, height, bmi) {
  const tableBody = document.querySelector('#dataTable tbody');
  const row = tableBody.insertRow();
          
  const cellGender = row.insertCell(0);
  const cellWeight = row.insertCell(1);
  const cellAge = row.insertCell(2);
  const cellHeight = row.insertCell(3);
  const cellBMI = row.insertCell(4);

  cellGender.textContent = gender;
  cellWeight.textContent = weight;
  cellAge.textContent = age;
  cellHeight.textContent = height;
  cellBMI.textContent = bmi;
}

// Fungsi untuk menampilkan hasil BMI
function displayResult(gender, weight, age, height, bmi) {
  const status = checkStatus(bmi, gender);
  const resultTitle = `Kategori BMI: ${status}`;
  const resultDesc = `Jenis Kelamin: ${gender}, Berat Badan: ${weight} Kg, Umur: ${age} Tahun, Tinggi Badan: ${height} cm`;
  const resultText = getDescText(status);
  const suggestionText = getSuggestionText(status);
  const adviceText = getAdviceText(status);
          
  document.getElementById('result-title').textContent = resultTitle;
  document.getElementById('result-bmi').textContent = bmi;
  document.getElementById('result-desc').textContent = resultDesc;
  document.getElementById('result-text').textContent = resultText;
  document.getElementById('suggestion-text').textContent = suggestionText;
  document.getElementById('advice-text').textContent = adviceText;

//MENAMPILKAN HASIL DAN MENYEMBUNYIKAN FORM
  document.getElementById('result').classList.remove('result-hidden');

  addAdditionalDataToTable(resultTitle, resultDesc, resultText, suggestionText, adviceText);
};

// Fungsi untuk menambahkan data ke tabel tambahan 1 *
function addAdditionalDataToTable(resultTitle, resultDesc, resultText, suggestionText, adviceText,) {
  const tableBody = document.querySelector('#additionalDataTable tbody');
  const row = tableBody.insertRow();

  const cellResultTitle = row.insertCell(0);
  const cellResultDesc = row.insertCell(1);
  const cellResultText = row.insertCell(2);
  const cellSuggestionText = row.insertCell(3);
  const cellAdviceText = row.insertCell(4);

  cellResultTitle.textContent = resultTitle;
  cellResultDesc.textContent = resultDesc;
  cellResultText.textContent = resultText;
  cellSuggestionText.textContent = suggestionText;
  cellAdviceText.textContent = adviceText;
};

// Fungsi untuk mendapatkan daftar penyakit berdasarkan status BMI */
const getDiseases = (status) => {
  if (status === BMI_CATEGORIES.UNDERWEIGHT) {
    return ['Kekurangan gizi', 'Gangguan pertumbuhan', 'Sistem kekebalan tubuh lemah', 'Gangguan kesuburan'];
  } else if (status === BMI_CATEGORIES.NORMAL) {
    return ['Tidak ada'];
  } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
    return ['Diabetes Tipe 2', 'Serangan Jantung', 'Hipertensi', 'Gastroesophageal Reflux Disease', 'Osteoarthritis', 'Kanker', 'Kolesterol Tinggi'];
  } else if (status === BMI_CATEGORIES.OBESITY) {
    return ['Penyakit Jantung', 'Stroke', 'Kanker', 'Masalah Pencernaan', 'Sleep Apnea', 'Osteoartritis']
  }
};

// Fungsi untuk menampilkan hasil BMI, status, saran, dan risiko penyakit */
const generateDisplay = (bmi, status) => {
  const resultTitle = document.getElementById('result-title');
  resultTitle.innerText = status;
  const resultBmi = document.getElementById('result-bmi');
  resultBmi.innerText = bmi;
  const resultDesc = document.getElementById('result-desc');
  resultDesc.innerText = getDescText(status);

  const resultText = document.getElementById('result-text');
  resultText.innerText = `Hasil BMI: ${bmi}`;

  const suggestionText = document.getElementById('suggestion-text');
  suggestionText.innerText = getSuggestionText(status);

  const adviceText = document.getElementById('advice-text');
  adviceText.innerText = getAdviceText(status);

  const riskTitle = document.getElementById('risk-title-1')
  riskTitle.innerText = `Beberapa resiko penyakit yang berasal dari tubuh ${status}`;

  const riskList = document.getElementById('list-risk-1');
  riskList.innerHTML = '';

  const diseases = getDiseases(status);
  diseases.forEach((disease) => {
    const listItem = document.createElement('li');
    listItem.innerText = disease;
    riskList.appendChild(listItem);
  });
};

//Menampilkan hasil untuk di download
document.getElementById('btn-download').addEventListener('click', function() {
  const content1 = document.getElementById('result');
  const content2 = document.getElementById('pdf-content');

  // Cek apakah konten1 ditampilkan atau disembunyikan
  if (content1.classList.contains('result-hidden')) {
      // Tampilkan konten1 dan sembunyikan konten2
      content1.classList.remove('result-hidden');
      content2.classList.add('pdf-content-hidden');
      this.textContent = 'Show Content 2';
  } else {
      // Sembunyikan konten1 dan tampilkan konten2
      content1.classList.add('result-hidden');
      content2.classList.remove('pdf-content-hidden');
      this.textContent = 'Show Content 1';
  }
});

/* Fungsi untuk mengembalikan tampilan form */
const regenerateBMI = () => {
  document.getElementById('home').classList.remove('result-hidden');
  document.getElementById('result').classList.add('result-hidden');
  document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
};

// Tombol Download PDF //
document.getElementById('btn-pdf-download').addEventListener('click', function () {
  const { jsPDF } = window.jspdf;

  html2canvas(document.getElementById('pdf-download')).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('hasil-bmi.pdf');
 // Sembunyikan animasi loading setelah proses selesai
 document.getElementById('loading').style.display = 'none';
  });
});
