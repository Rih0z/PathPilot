import React from 'react'
import { useUserData } from '@contexts/UserDataContext'
import { 
  FaUser,
  FaBullseye,
  FaChartLine,
  FaCogs,
  FaExclamationCircle,
  FaLightbulb,
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDollarSign,
  FaTrophy,
  FaTools,
  FaGraduationCap,
  FaClipboardList,
  FaArrowRight,
  FaEdit,
  FaDownload
} from 'react-icons/fa'

interface UserDashboardProps {
  onEdit: () => void
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onEdit }) => {
  const { userData } = useUserData()

  if (!userData) {
    return (
      <div className="text-center py-12">
        <FaUser className="text-6xl text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">ユーザーデータなし</h2>
        <p className="text-gray-600">データインポート機能を使用してユーザー情報を取得してください</p>
      </div>
    )
  }

  const getMatchingScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getActivityStatus = () => {
    const { applicationsSubmitted, interviewsScheduled, offers } = userData.currentActivity
    if (offers > 0) return { status: '内定獲得中', color: 'bg-green-500', icon: FaTrophy }
    if (interviewsScheduled > 0) return { status: '面接進行中', color: 'bg-blue-500', icon: FaCalendarAlt }
    if (applicationsSubmitted > 0) return { status: '応募活動中', color: 'bg-orange-500', icon: FaClipboardList }
    return { status: '活動準備中', color: 'bg-gray-500', icon: FaCogs }
  }

  const activityStatus = getActivityStatus()

  return (
    <section className="section bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              {userData.basicInfo.name}さんのダッシュボード
            </h1>
            <p className="text-gray-600">
              インポート日時: {new Date(userData.importedAt || '').toLocaleString('ja-JP')}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <FaEdit />
              データ更新
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors">
              <FaDownload />
              レポート出力
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左カラム - 基本情報・ステータス */}
          <div className="space-y-6">
            {/* 基本情報カード */}
            <div className="card bg-white rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-4">
                <FaUser className="text-blue-600" />
                基本情報
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">年齢</span>
                  <span className="font-medium">{userData.basicInfo.age}歳</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">学歴</span>
                  <span className="font-medium text-right">{userData.basicInfo.education}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">状況</span>
                  <span className="font-medium">{userData.basicInfo.currentStatus}</span>
                </div>
              </div>
            </div>

            {/* 活動ステータス */}
            <div className="card bg-white rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-4">
                <FaChartLine className="text-blue-600" />
                活動ステータス
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${activityStatus.color}`}></div>
                <span className="font-semibold">{activityStatus.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{userData.currentActivity.applicationsSubmitted}</div>
                  <div className="text-xs text-gray-600">応募企業</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{userData.currentActivity.interviewsScheduled}</div>
                  <div className="text-xs text-gray-600">面接予定</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{userData.currentActivity.offers}</div>
                  <div className="text-xs text-gray-600">内定</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{userData.currentActivity.platforms.length}</div>
                  <div className="text-xs text-gray-600">利用サービス</div>
                </div>
              </div>
            </div>

            {/* AI分析結果 */}
            {userData.analysis && (
              <div className="card bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-4">
                  <FaLightbulb className="text-purple-600" />
                  AI分析結果
                </h3>
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg ${getMatchingScoreColor(userData.analysis.matchingScore)}`}>
                    マッチング度: {userData.analysis.matchingScore}%
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-green-700">強み:</span>
                    <div className="mt-1 text-gray-700">{userData.analysis.strengths.join(', ')}</div>
                  </div>
                  <div>
                    <span className="font-medium text-orange-700">改善エリア:</span>
                    <div className="mt-1 text-gray-700">{userData.analysis.improvementAreas.join(', ')}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 中央カラム - 希望条件・経験 */}
          <div className="space-y-6">
            {/* 希望条件 */}
            <div className="card bg-white rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-4">
                <FaBullseye className="text-blue-600" />
                希望条件
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaBriefcase />
                    業界・職種
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">{userData.jobSearchInfo.targetIndustries.join(', ')}</div>
                    <div className="text-gray-600">{userData.jobSearchInfo.targetPositions.join(', ')}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <FaDollarSign />
                      希望年収
                    </div>
                    <div className="text-sm font-medium">{userData.jobSearchInfo.preferredSalary}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <FaMapMarkerAlt />
                      勤務地
                    </div>
                    <div className="text-sm font-medium">{userData.jobSearchInfo.preferredLocation}</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaCalendarAlt />
                    入社希望時期
                  </div>
                  <div className="text-sm font-medium">{userData.jobSearchInfo.startDate}</div>
                </div>
              </div>
            </div>

            {/* 経験・スキル */}
            <div className="card bg-white rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-4">
                <FaTools className="text-blue-600" />
                経験・スキル
              </h3>
              <div className="space-y-4">
                {/* 職歴 */}
                {userData.experience.workHistory.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">職歴</h4>
                    <div className="space-y-2">
                      {userData.experience.workHistory.slice(0, 2).map((work, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm">
                          <div className="font-medium">{work.company} - {work.position}</div>
                          <div className="text-gray-600">{work.duration}</div>
                          {work.achievements.length > 0 && (
                            <div className="text-gray-700 mt-1">主な成果: {work.achievements[0]}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* スキル */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">保有スキル</h4>
                  <div className="flex flex-wrap gap-2">
                    {userData.experience.skills.slice(0, 6).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                        {skill}
                      </span>
                    ))}
                    {userData.experience.skills.length > 6 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                        他{userData.experience.skills.length - 6}件
                      </span>
                    )}
                  </div>
                </div>

                {/* 資格 */}
                {userData.experience.certifications.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">資格・認定</h4>
                    <div className="text-sm text-gray-700">
                      {userData.experience.certifications.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右カラム - 課題・次のアクション */}
          <div className="space-y-6">
            {/* 課題・悩み */}
            <div className="card bg-white rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-4">
                <FaExclamationCircle className="text-orange-600" />
                課題・悩み
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">主な懸念事項</h4>
                  <ul className="space-y-1">
                    {userData.challenges.mainConcerns.map((concern, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                        {concern}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">障壁</h4>
                  <ul className="space-y-1">
                    {userData.challenges.blockers.map((blocker, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                        {blocker}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">必要なサポート</h4>
                  <ul className="space-y-1">
                    {userData.challenges.support.map((support, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        {support}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 次のアクション */}
            {userData.analysis?.nextActions && (
              <div className="card bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-4">
                  <FaArrowRight className="text-green-600" />
                  推奨アクション
                </h3>
                <div className="space-y-3">
                  {userData.analysis.nextActions.map((action, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 利用サービス */}
            <div className="card bg-white rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-4">
                <FaCogs className="text-blue-600" />
                利用サービス
              </h3>
              <div className="space-y-2">
                {userData.currentActivity.platforms.map((platform, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{platform}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-600">
                最終活動: {userData.currentActivity.lastActivity}
              </div>
            </div>
          </div>
        </div>

        {/* 追加情報 */}
        {userData.additionalInfo.notes && (
          <div className="mt-6 card bg-white rounded-2xl p-6">
            <h3 className="font-bold text-blue-900 mb-3">追加メモ</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{userData.additionalInfo.notes}</p>
          </div>
        )}
      </div>
    </section>
  )
}