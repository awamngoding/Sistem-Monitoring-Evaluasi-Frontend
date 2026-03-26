import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./page/otorisasi/Login";
import Onboarding from "./page/onboarding/OnBoarding";

// NON AKADEMIK
import DashboardnonAkademik from "./page/nonAkademik/DashboardnonAkademik";
import CreateAssessmentnonAkademik from "./page/nonAkademik/assnonakademik/CreateAssessmentnonAkademik";
import DetailAssessmentNonAkademik from "./page/nonAkademik/assnonakademik/DetailAssessmentnonAkademik";
import EditAssessmentNonAkademik from "./page/nonAkademik/assnonakademik/EditAssessmentnonAkademik";
import OnBoardingNonAkademik from "./page/nonAkademik/OnBoardingnonAkademik";
import CreateProgramNonAkademik from "./page/nonAkademik/proNonAkademik/CreateProgramnonAkademik";
import DetailProgramNonAkademik from "./page/nonAkademik/proNonAkademik/DetailProgramnonAkademik";
import EditProgramNonAkademik from "./page/nonAkademik/proNonAkademik/EditProgramnonAkademik";

// AKADEMIK
import DashboardAkademik from "./page/akademik/DashboardAkademik";
import CreateAssessmentAkademik from "./page/akademik/assakademik/CreateAssessmentAkademik";
import DetailAssessmentAkademik from "./page/akademik/assakademik/DetailAssessmentAkademik";
import EditAssessmentAkademik from "./page/akademik/assakademik/EditAssessmentAkademik";
import OnBoardingAkademik from "./page/akademik/OnBoardingAkademik";
import CreateProgramAkademik from "./page/akademik/proAkademik/CreateProgramAkademik";
import DetailProgramAkademik from "./page/akademik/proAkademik/DetailProgramAkademik";
import EditProgramAkademik from "./page/akademik/proAkademik/EditProgramAkademik";

// SEKOLAH
import DashboardSekolah from "./page/sekolah/DashboardSekolah";
import IsiAssessmentSekolah from "./page/sekolah/IsiAssessmentSekolah";

// ADMIN
import DashboardAdmin from "./page/admin/DashboardAdmin";

// OTORISASI
import Registrasi from "./page/otorisasi/Registrasi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />

        {/* SEKOLAH */}
        <Route path="/sekolah/dashboard" element={<DashboardSekolah />} />
        <Route
          path="/sekolah/assessment/isi/:id"
          element={<IsiAssessmentSekolah />}
        />

        {/* OTORISASI */}
        <Route path="/registrasi" element={<Registrasi />} />

        {/* HO NON AKADEMIK */}
        <Route path="/ho/dashboard" element={<DashboardnonAkademik />} />
        <Route
          path="/ho/onboarding/non-akademik"
          element={<OnBoardingNonAkademik />}
        />
        <Route
          path="/ho/assessment/non-akademik/create"
          element={<CreateAssessmentnonAkademik />}
        />
        <Route
          path="/ho/assessment/non-akademik/detail/:id"
          element={<DetailAssessmentNonAkademik />}
        />
        <Route
          path="/ho/assessment/non-akademik/edit/:id"
          element={<EditAssessmentNonAkademik />}
        />
        <Route
          path="/ho/program/non-akademik"
          element={<DashboardnonAkademik />}
        />
        <Route
          path="/ho/program/non-akademik/create"
          element={<CreateProgramNonAkademik />}
        />
        <Route
          path="/ho/program/non-akademik/detail/:id"
          element={<DetailProgramNonAkademik />}
        />
        <Route
          path="/ho/program/non-akademik/edit/:id"
          element={<EditProgramNonAkademik />}
        />

        {/* HO AKADEMIK */}
        <Route
          path="/ho/assessment/akademik/dashboard"
          element={<DashboardAkademik />}
        />
        <Route
          path="/ho/onboarding/akademik"
          element={<OnBoardingAkademik />}
        />
        <Route
          path="/ho/assessment/akademik/create"
          element={<CreateAssessmentAkademik />}
        />
        <Route
          path="/ho/assessment/akademik/detail/:id"
          element={<DetailAssessmentAkademik />}
        />
        <Route
          path="/ho/assessment/akademik/edit/:id"
          element={<EditAssessmentAkademik />}
        />
        <Route path="/ho/program/akademik" element={<DashboardAkademik />} />
        <Route
          path="/ho/program/akademik/create"
          element={<CreateProgramAkademik />}
        />
        <Route
          path="/ho/program/akademik/detail/:id"
          element={<DetailProgramAkademik />}
        />
        <Route
          path="/ho/program/akademik/edit/:id"
          element={<EditProgramAkademik />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
