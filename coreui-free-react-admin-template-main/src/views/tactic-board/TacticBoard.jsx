import React from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { formation433 } from './formation433'
import './tactic-board.css'

const TacticBoard = () => (
  <CCard>
    <CCardBody>
      <h1 className="h4 mb-3">축구 전술판</h1>
      <p>4-3-3 포메이션</p>
      <div className="tactic-board-pitch">
        <div className="tactic-board-markings" aria-hidden="true">
          <span className="tactic-board-halfway" />
          <span className="tactic-board-circle" />
          <span className="tactic-board-area tactic-board-area-top" />
          <span className="tactic-board-area tactic-board-area-bottom" />
        </div>
        <ul className="tactic-board-players" aria-label="4-3-3 선수 배치">
          {formation433.map(({ id, number, position, x, y }) => (
            <li key={id} className="tactic-board-player" style={{ left: x + '%', top: y + '%' }}>
              <span className="tactic-board-number">{number}</span>
              <span className="tactic-board-position">{position}</span>
            </li>
          ))}
        </ul>
      </div>
    </CCardBody>
  </CCard>
)

export default TacticBoard
