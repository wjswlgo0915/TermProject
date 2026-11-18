
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../../../firebase'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { logo } from 'src/assets/brand/logo'
import { eye } from 'src/assets/icons/eye'

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('이름을 입력해 주세요.')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      })

      alert('회원가입이 완료되었습니다!')
      navigate('/')
    } catch (err) {
      console.error(err.code)

      if (err.code === 'auth/email-already-in-use') {
        setError('이미 가입된 이메일입니다.')
      } else if (err.code === 'auth/invalid-email') {
        setError('올바른 이메일 주소를 입력해 주세요.')
      } else if (err.code === 'auth/weak-password') {
        setError('더 안전한 비밀번호를 입력해 주세요.')
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Firebase에서 이메일/비밀번호 로그인을 활성화해 주세요.')
      } else {
        setError('회원가입 중 오류가 발생했습니다.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6} xl={5}>
            <div className="d-flex flex-column gap-4 text-center">
              <div>
                <CIcon icon={logo} height={48} />
              </div>

              <CCard className="p-4">
                <CCardBody className="d-flex flex-column gap-4">
                  <h2 className="h5 text-center mb-0">
                    회원가입
                  </h2>

                  <CForm
                    className="row gy-3 text-start"
                    onSubmit={handleSubmit}
                  >
                    <CCol xs={12}>
                      <CFormLabel htmlFor="name">이름</CFormLabel>
                      <CFormInput
                        id="name"
                        placeholder="이름을 입력하세요"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </CCol>

                    <CCol xs={12}>
                      <CFormLabel htmlFor="email">이메일</CFormLabel>
                      <CFormInput
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CCol>

                    <CCol xs={12}>
                      <CFormLabel htmlFor="password">
                        비밀번호
                      </CFormLabel>
                      <CInputGroup>
                        <CFormInput
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="6자 이상 입력"
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          minLength={6}
                          required
                        />
                        <CInputGroupText>
                          <CButton
                            type="button"
                            color="link"
                            className="p-0 link-secondary"
                            aria-label="비밀번호 보기"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <CIcon icon={eye} size="sm" />
                          </CButton>
                        </CInputGroupText>
                      </CInputGroup>
                    </CCol>

                    <CCol xs={12}>
                      <CFormLabel htmlFor="confirmPassword">
                        비밀번호 확인
                      </CFormLabel>
                      <CFormInput
                        id="confirmPassword"
                        type="password"
                        placeholder="비밀번호를 다시 입력하세요"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        required
                      />
                    </CCol>

                    {error && (
                      <CCol xs={12}>
                        <div className="text-danger small">
                          {error}
                        </div>
                      </CCol>
                    )}

                    <CCol xs={12}>
                      <CButton
                        color="primary"
                        type="submit"
                        className="w-100"
                        disabled={loading}
                      >
                        {loading ? '가입 중...' : '회원가입'}
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>

              <div className="text-body-secondary">
                이미 계정이 있나요?{' '}
                <Link to="/authentication/login">
                  로그인
                </Link>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
