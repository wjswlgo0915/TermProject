
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
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

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert('로그인에 성공했습니다!')
      navigate('/')
    } catch (err) {
      console.error(err.code)

      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        setError('이메일 또는 비밀번호를 확인해 주세요.')
      } else if (err.code === 'auth/invalid-email') {
        setError('올바른 이메일 형식을 입력해 주세요.')
      } else if (err.code === 'auth/too-many-requests') {
        setError('로그인 시도가 많습니다. 잠시 후 다시 시도해 주세요.')
      } else {
        setError('로그인 중 오류가 발생했습니다.')
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
            <div className="d-flex flex-column gap-4">
              <div className="text-center">
                <CIcon icon={logo} height={48} />
              </div>

              <CCard className="p-4">
                <CCardBody className="d-flex flex-column gap-4">
                  <h2 className="h5 text-center mb-0">
                    Login to your account
                  </h2>

                  <CForm className="row gy-3" onSubmit={handleLogin}>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="email">
                        Email address
                      </CFormLabel>
                      <CFormInput
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </CCol>

                    <CCol xs={12}>
                      <div className="d-flex justify-content-between">
                        <CFormLabel htmlFor="password">
                          Password
                        </CFormLabel>
                        <Link to="/authentication/reset-password">
                          I forgot password
                        </Link>
                      </div>

                      <CInputGroup>
                        <CFormInput
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Your password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(event) =>
                            setPassword(event.target.value)
                          }
                          required
                        />
                        <CInputGroupText>
                          <CButton
                            type="button"
                            color="link"
                            className="p-0 link-secondary"
                            aria-label={
                              showPassword
                                ? 'Hide password'
                                : 'Show password'
                            }
                            onClick={() =>
                              setShowPassword(!showPassword)
                            }
                          >
                            <CIcon icon={eye} size="sm" />
                          </CButton>
                        </CInputGroupText>
                      </CInputGroup>
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
                        {loading ? '로그인 중...' : 'Sign in'}
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>

              <div className="text-center text-body-secondary">
                Need an account?{' '}
                <Link to="/authentication/register">
                  Sign up
                </Link>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
