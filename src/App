
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("login");
  const [page, setPage] = useState("Home");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          await setDoc(ref, {
            displayName: currentUser.displayName || "Peach Member",
            email: currentUser.email,
            points: 0,
            createdAt: serverTimestamp()
          });
        }
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users"),
      orderBy("points", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMembers(
        snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }))
      );
    }, (error) => {
      setMessage("โหลดอันดับไม่สำเร็จ: " + error.message);
    });

    return unsubscribe;
  }, [user]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");
    setSaving(true);

    try {
      if (mode === "register") {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(result.user, {
          displayName: displayName
        });

        await setDoc(doc(db, "users", result.user.uid), {
          displayName,
          email,
          points: 0,
          createdAt: serverTimestamp()
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setMessage(error.message);
    }

    setSaving(false);
  };

  const saveName = async () => {
    if (!displayName.trim()) return;

    setSaving(true);

    try {
      await updateProfile(user, {
        displayName: displayName.trim()
      });

      await setDoc(doc(db, "users", user.uid), {
        displayName: displayName.trim()
      }, { merge: true });

      setMessage("บันทึกชื่อเรียบร้อยแล้ว 💗");
    } catch (error) {
      setMessage(error.message);
    }

    setSaving(false);
  };

  if (loading) {
    return <div style={styles.center}>กำลังเปิด Peach Stream Hub 🍑</div>;
  }

  if (!user) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <div style={{ fontSize: 55 }}>🍑</div>
          <h1>Peach Stream Hub</h1>
          <p>Let's stream together, shining forever!</p>

          <form onSubmit={handleAuth}>
            {mode === "register" && (
              <input
                style={styles.input}
                placeholder="ชื่อที่ใช้ในเว็บ"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            )}

            <input
              style={styles.input}
              type="email"
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              style={styles.input}
              type="password"
              placeholder="รหัสผ่าน (อย่างน้อย 6 ตัว)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />

            <button style={styles.mainButton} disabled={saving}>
              {saving
                ? "กำลังดำเนินการ..."
                : mode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
            </button>
          </form>

          <p style={styles.message}>{message}</p>

          <button
            style={styles.linkButton}
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setMessage("");
            }}
          >
            {mode === "login"
              ? "ยังไม่มีบัญชี? สมัครสมาชิก"
              : "มีบัญชีแล้ว? เข้าสู่ระบบ"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div>
          <strong>🍑 Peach Stream Hub</strong>
          <small>JAehyun Support Project</small>
        </div>
        <button
          style={styles.logout}
          onClick={() => signOut(auth)}
        >
          ออกจากระบบ
        </button>
      </header>

      <nav style={styles.nav}>
        {["Home", "Stream", "Ranking", "Profile"].map((item) => (
          <button
            key={item}
            onClick={() => {
              setPage(item);
              setMessage("");
            }}
            style={{
              ...styles.navButton,
              background: page === item ? "#ff8db5" : "#fff0f5",
              color: page === item ? "white" : "#a75b78"
            }}
          >
            {item === "Home" ? "🏠" :
             item === "Stream" ? "🎵" :
             item === "Ranking" ? "🏆" : "👤"}
            {" "}{item}
          </button>
        ))}
      </nav>

      <main style={styles.content}>
        {page === "Home" && (
          <>
            <section style={styles.hero}>
              <div style={{ fontSize: 45 }}>🍑</div>
              <h1>Let's stream together!</h1>
              <p>ทุกสตรีมของเรามีความหมาย</p>
              <p>ยินดีต้อนรับ {user.displayName || "Peach Member"} 💗</p>
            </section>

            <section style={styles.card}>
              <h2>Our Streaming Goal 🎧</h2>
              <p>ติดตามยอดสตรีมและเป้าหมายของแจฮยอนไปด้วยกัน</p>
              <p style={styles.note}>
                ยอดสตรีมจะแสดงเมื่อมีการเพิ่มข้อมูลจริงในระบบ
              </p>
            </section>
          </>
        )}

        {page === "Stream" && (
          <section style={styles.card}>
            <h2>Monthly Peach Stamp 🍑</h2>
            <p>พื้นที่สะสมสแตมป์ประจำวันของสมาชิก</p>
            <p style={styles.note}>
              ระบบส่งหลักฐานและรับสแตมป์จะเพิ่มในขั้นตอนถัดไป
            </p>
          </section>
        )}

        {page === "Ranking" && (
          <section style={styles.card}>
            <h2>🏆 Peach Ranking</h2>
            {members.map((member, index) => (
              <div key={member.id} style={styles.rankRow}>
                <strong>#{index + 1}</strong>
                <span>{member.displayName || "Peach Member"}</span>
                <strong>{member.points || 0} pts</strong>
              </div>
            ))}
            {members.length === 0 && <p>ยังไม่มีสมาชิกในอันดับ</p>}
          </section>
        )}

        {page === "Profile" && (
          <section style={styles.card}>
            <h2>My Profile 👤</h2>
            <p>อีเมล: {user.email}</p>
            <input
              style={styles.input}
              placeholder="ชื่อสมาชิก"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <button
              style={styles.mainButton}
              onClick={saveName}
              disabled={saving}
            >
              บันทึกชื่อ
            </button>
            <p>{message}</p>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  center: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#fff5f8",
    color: "#b85c7d"
  },
  loginPage: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg,#fff1f6,#ffe0eb)",
    padding: 20
  },
  loginCard: {
    background: "white",
    padding: 28,
    borderRadius: 25,
    width: "100%",
    maxWidth: 390,
    textAlign: "center",
    boxShadow: "0 8px 30px #e9a9c455",
    color: "#a75b78"
  },
  app: {
    minHeight: "100vh",
    background: "#fff6f9",
    color: "#85465f",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    padding: 18,
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
    background: "#ffe8f0"
  },
  navButton: {
    border: 0,
    borderRadius: 20,
    padding: "10px 14px",
    cursor: "pointer"
  },
  content: {
    maxWidth: 850,
    margin: "auto",
    padding: 18
  },
  hero: {
    background: "linear-gradient(135deg,#ffdce9,#fff0f5)",
    borderRadius: 25,
    padding: 30,
    textAlign: "center",
    marginBottom: 18
  },
  card: {
    background: "white",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
    boxShadow: "0 4px 18px #e9a9c422"
  },
  input: {
    boxSizing: "border-box",
    width: "100%",
    padding: 13,
    border: "1px solid #f3c4d5",
    borderRadius: 12,
    margin: "8px 0",
    fontSize: 16
  },
  mainButton: {
    width: "100%",
    padding: 13,
    border: 0,
    borderRadius: 14,
    background: "#ff8db5",
    color: "white",
    fontSize: 16,
    cursor: "pointer",
    marginTop: 10
  },
  logout: {
    border: 0,
    borderRadius: 12,
    padding: 10,
    background: "#fff0f5",
    color: "#a75b78"
  },
  linkButton: {
    border: 0,
    background: "transparent",
    color: "#d66d96",
    marginTop: 15,
    cursor: "pointer"
  },
  rankRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: 14,
    borderBottom: "1px solid #ffe0eb"
  },
  note: {
    color: "#b27b91",
    fontSize: 13
  },
  message: {
    color: "#c14e7d",
    overflowWrap: "anywhere"
  }
};

