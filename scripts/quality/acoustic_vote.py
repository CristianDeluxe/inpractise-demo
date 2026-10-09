from verdict import ACOUSTIC_MARGIN


def acoustic_vote(margin):
    return 'ai' if margin > ACOUSTIC_MARGIN else 'raw' if margin < -ACOUSTIC_MARGIN else 'undecided'
